import { Column, Entity, ManyToOne } from 'typeorm';
import { Company } from './company.entity';
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
}
