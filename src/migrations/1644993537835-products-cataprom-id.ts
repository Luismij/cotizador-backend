import {MigrationInterface, QueryRunner} from "typeorm";

export class productsCatapromId1644993537835 implements MigrationInterface {
    name = 'productsCatapromId1644993537835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "catapromId"`);
        await queryRunner.query(`ALTER TABLE "detail" DROP CONSTRAINT "FK_34c5d5fbefab85b31416e69b2ff"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "product_id_seq"`);
        await queryRunner.query(`ALTER TABLE "detail" ADD CONSTRAINT "FK_34c5d5fbefab85b31416e69b2ff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "detail" DROP CONSTRAINT "FK_34c5d5fbefab85b31416e69b2ff"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "product_id_seq" OWNED BY "product"."id"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "id" SET DEFAULT nextval('"product_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "detail" ADD CONSTRAINT "FK_34c5d5fbefab85b31416e69b2ff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD "catapromId" integer NOT NULL`);
    }

}
