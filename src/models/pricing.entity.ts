import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Customer } from './customer.entity';
import { Detail } from './detail.entity';
import { User } from './user.entity';

@Entity()
export class Pricing extends BaseEntity {
  @Column()
  number: string;

  @Column('date', { nullable: true })
  validSince?: Date;

  @Column('date', { nullable: true })
  validUntil?: Date;

  @ManyToOne(() => Customer, (customer) => customer.pricings)
  customer: Customer;

  @ManyToOne(() => User, (user) => user.pricings)
  user: User;

  @OneToMany(() => Detail, (detail) => detail.pricing)
  details: Detail[];
}
