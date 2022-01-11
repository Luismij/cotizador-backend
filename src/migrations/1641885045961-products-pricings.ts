import { MigrationInterface, QueryRunner } from 'typeorm';

export class productsPricings1641885045961 implements MigrationInterface {
  name = 'productsPricings1641885045961';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pricing" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internalComment" character varying(300), "customerId" integer, "userId" integer, CONSTRAINT "PK_4f6e9c88033106a989aa7ce9dee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "detail" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internalComment" character varying(300), "price" integer NOT NULL, "vat" real NOT NULL DEFAULT '0.19', "quantity" integer NOT NULL, "discount" integer, "subtotal" integer NOT NULL, "marking" character varying, "inks" integer, "productId" integer, "pricingId" integer, CONSTRAINT "PK_28de27ee9ae6103af88ab1b3c0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internalComment" character varying(300), "sku" character varying NOT NULL, "price" integer NOT NULL, "photo" character varying, "catapromId" integer NOT NULL, "categoryId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internalComment" character varying(300), "catapromId" integer NOT NULL, "nombre" character varying NOT NULL, "parentId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing" ADD CONSTRAINT "FK_3796f275cdfce4098ec3859bb08" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing" ADD CONSTRAINT "FK_5d3b3ad01474e00dcd3a08c5558" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "detail" ADD CONSTRAINT "FK_34c5d5fbefab85b31416e69b2ff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "detail" ADD CONSTRAINT "FK_3a60d7f41838a22b5900b6542e0" FOREIGN KEY ("pricingId") REFERENCES "pricing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`,
    );
    await queryRunner.query(
      `ALTER TABLE "detail" DROP CONSTRAINT "FK_3a60d7f41838a22b5900b6542e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "detail" DROP CONSTRAINT "FK_34c5d5fbefab85b31416e69b2ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing" DROP CONSTRAINT "FK_5d3b3ad01474e00dcd3a08c5558"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing" DROP CONSTRAINT "FK_3796f275cdfce4098ec3859bb08"`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "detail"`);
    await queryRunner.query(`DROP TABLE "pricing"`);
  }
}
