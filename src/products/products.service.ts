import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Product } from 'src/models/product.entity';

import { CatapromResult } from 'src/models/cataprom/result.cataprom';
import { CatapromCategory } from 'src/models/cataprom/category.cataprom';
import { CatapromProduct } from 'src/models/cataprom/product.cataprom';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product) repo,
    private config: ConfigService,
    private httpService: HttpService,
  ) {
    super(repo);
  }

  private fetchCatapromCategories(): Observable<CatapromCategory[]> {
    return this.httpService
      .get<CatapromResult<CatapromCategory[]>>(`/categorias`)
      .pipe(map((response) => response.data?.resultado));
  }

  private fetchCatapromProductsByCategory(
    categoryId: number,
  ): Observable<CatapromProduct[]> {
    return this.httpService
      .get<CatapromResult<CatapromProduct[]>>(
        `/categorias/${categoryId}/productos`,
      )
      .pipe(map((response) => response.data?.resultado));
  }

  private async fetchAllCatapromProducts() {
    this.logger.debug('Fetching all cataprom products...');
    const observableSources: Observable<CatapromProduct[]>[] = [];
    // Get the first value from the rxjs observable
    // which is the whole CatapromCategory[] in this case.
    const categories = await firstValueFrom(this.fetchCatapromCategories());

    // Get observable sources (all http calls needed to get all products)
    categories.forEach((cat) => {
      if (cat.idParent == null)
        observableSources.push(this.fetchCatapromProductsByCategory(cat.id));
    });

    // Return all the cataprom products
    return forkJoin(observableSources, (...values: CatapromProduct[][]) =>
      values.flat(),
    );
  }

  @
  @Cron(CronExpression.EVERY_DAY_AT_5PM, {
    name: 'Update products',
    timeZone: 'America/Bogota',
  })
  async updateProducts() {
    this.logger.debug('Attempting update of products');

    try {
      const catapromProducts = await firstValueFrom(
        await this.fetchAllCatapromProducts(),
      );

      /**
       * Apparently Cataprom creates multiple products
       * with the same id but different categoryId.
       * So in reality, a product has many categories.
       * Since I don't have a reason to care about categories,
       * I will be omitting the repeated products.
       */

      const uniqueProducts: Product[] = [];
      const map = new Map();
      for (const p of catapromProducts) {
        if (!map.has(p.id)) {
          map.set(p.id, true); // set any value to Map
          uniqueProducts.push(
            this.repo.create({
              id: p.id,
              photo: p.imageUrl,
              sku: p.referencia,
              price: p.precio1,
              description: p.descripcionProducto,
            }),
          );
        }
      }

      this.repo.upsert(uniqueProducts, ['id']);

      this.logger.debug(
        `Succesfully updated ${uniqueProducts.length} products`,
      );
      return uniqueProducts;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message);
      }
      throw new InternalServerErrorException(
        {
          message: 'There was an error updating the products from Cataprom',
          statusCode: 500,
        },
        'There was an error updating the products from Cataprom',
      );
    }
  }
}
