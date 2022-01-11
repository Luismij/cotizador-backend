import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Pricing } from './pricing.entity';
import { Product } from './product.entity';

@Entity()
export class Detail extends BaseEntity {
  @ManyToOne(() => Product, (product) => product.details)
  product: Product;

  @ManyToOne(() => Pricing, (pricing) => pricing.details)
  pricing: Pricing;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0.19, type: 'real' })
  vat: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: true })
  discount: number | null;

  @Column({ nullable: false })
  subtotal: number;

  @Column({ nullable: true })
  marking: string | null;

  @Column({ nullable: true })
  inks: number | null;

  @BeforeInsert()
  @BeforeUpdate()
  calculateSubtotal() {
    if (this.quantity && this.price) {
      if (this.discount) {
        this.subtotal = this.quantity * this.price * (1 - this.discount / 100);
      } else {
        this.subtotal = this.quantity * this.price;
      }
    }
  }
}
