import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { Detail } from './detail.entity';

@Entity()
export class Product extends BaseEntity {
  @Column({ nullable: false })
  sku: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  photo: string | null;

  @Column({ nullable: false })
  catapromId: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Detail, (detail) => detail.product)
  details: Detail[];
}
