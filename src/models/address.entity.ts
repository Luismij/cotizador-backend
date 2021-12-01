import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

/**
 * Nombre, Logo, Nit, Dirección, Razón Social, Teléfono, Correo, y Dirección Web.
 */
@Entity()
export class Address extends BaseEntity {
  @Column()
  address: string;

  @Column({ nullable: true })
  unit: string | null;

  @Column()
  city: string;

  @Column()
  state: string;
}
