import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

import { CrudValidationGroups } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidationGroups;

/**
 * Nombre, Logo, Nit, Dirección, Razón Social, Teléfono, Correo, y Dirección Web.
 */
@Entity()
export abstract class Company extends BaseEntity {
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({
    groups: [CREATE],
    message: 'El nombre (name) no puede estar vacío',
  })
  @IsString({ always: true })
  @Column()
  name: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsString({ groups: [CREATE, UPDATE] })
  @Column({ nullable: true })
  logo: string | null;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE], message: 'El nit no puede estar vacío' })
  @IsString({ always: true, message: 'El nit debe ser un string' })
  @Column({ nullable: false, unique: true })
  nit: string;

  @Column({ nullable: true })
  email: string | null;

  @Column({ nullable: true })
  socialReason: string | null;

  @Column({ nullable: true })
  phone: string | null;

  @Column({ nullable: true })
  webpage: string | null;

  @Column({ nullable: true })
  address: string | null;
}
