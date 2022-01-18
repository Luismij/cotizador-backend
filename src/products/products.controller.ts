import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Product } from 'src/models/product.entity';
import { ProductsService } from './products.service';

@Crud({
  model: {
    type: Product,
  },
  // routes: {
  //   only: ['getManyBase', 'getOneBase'],
  // },
})
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}
}
