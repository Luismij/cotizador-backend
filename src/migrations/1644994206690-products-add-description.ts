import {MigrationInterface, QueryRunner} from "typeorm";

export class productsAddDescription1644994206690 implements MigrationInterface {
    name = 'productsAddDescription1644994206690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
    }

}
