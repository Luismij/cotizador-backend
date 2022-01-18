import {MigrationInterface, QueryRunner} from "typeorm";

export class pricingDatesNullable1642226170113 implements MigrationInterface {
    name = 'pricingDatesNullable1642226170113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pricing" ALTER COLUMN "validSince" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pricing" ALTER COLUMN "validUntil" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pricing" ALTER COLUMN "validUntil" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pricing" ALTER COLUMN "validSince" SET NOT NULL`);
    }

}
