import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import * as bcrypt from 'bcrypt';
import { Customer } from './customer.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { CrudValidationGroups } from '@nestjsx/crud';
import { Pricing } from './pricing.entity';
const { CREATE, UPDATE } = CrudValidationGroups;

/**
 * Nombre, Logo, Nit, Dirección, Razón Social, Teléfono, Correo, y Dirección Web.
 */
@Entity()
export class User extends Company {
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({
    groups: [CREATE],
    message: 'El email no puede estar vacío',
  })
  @IsEmail(
    {},
    { always: true, message: 'El email debe ser un correo electrónico válido' },
  )
  @Column({ nullable: false, unique: true })
  email!: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({
    groups: [CREATE],
    message: 'La contraseña (password) no puede estar vacía',
  })
  @MinLength(10, { always: true })
  @MaxLength(20, { always: true })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Contraseña (password) muy débil',
  })
  @Column({ nullable: false })
  password!: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @OneToMany(() => Pricing, (pricing) => pricing.user)
  pricings: Pricing[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
