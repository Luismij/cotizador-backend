import {MigrationInterface, QueryRunner} from "typeorm";

export class pricingDates1642225788540 implements MigrationInterface {
    name = 'pricingDates1642225788540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pricing" ADD "validSince" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pricing" ADD "validUntil" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pricing" DROP COLUMN "validUntil"`);
        await queryRunner.query(`ALTER TABLE "pricing" DROP COLUMN "validSince"`);
    }

}
