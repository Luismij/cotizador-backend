import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Detail } from './detail.entity';

@Entity()
export class Product {
  @PrimaryColumn({ nullable: false })
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  internalComment: string | null;

  @Column({ nullable: false })
  sku: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  photo: string | null;

  @ManyToMany(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Detail, (detail) => detail.product)
  details: Detail[];
}
