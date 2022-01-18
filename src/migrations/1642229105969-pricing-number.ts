import {MigrationInterface, QueryRunner} from "typeorm";

export class pricingNumber1642229105969 implements MigrationInterface {
    name = 'pricingNumber1642229105969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pricing" ADD "number" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pricing" DROP COLUMN "number"`);
    }

}
