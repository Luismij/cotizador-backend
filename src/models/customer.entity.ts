import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Pricing } from './pricing.entity';
import { User } from './user.entity';

/**
 * Nombre, Logo, Nit, Dirección, Razón Social, Teléfono, Correo, y Dirección Web.
 */
@Entity()
export class Customer extends Company {
  @ManyToOne(() => User, (user) => user.customers)
  user: User;

  @Column({ nullable: true })
  contact: string | null;

  @OneToMany(() => Pricing, (pricing) => pricing.customer)
  pricings: Pricing[];
}
