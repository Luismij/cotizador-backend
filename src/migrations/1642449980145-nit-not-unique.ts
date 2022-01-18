import {MigrationInterface, QueryRunner} from "typeorm";

export class nitNotUnique1642449980145 implements MigrationInterface {
    name = 'nitNotUnique1642449980145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_7917f87e3719deca503c1e847e4"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_5929a7686f6f611c6022c4cecc4"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_a33a6b42daba1af459bde948920"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_a33a6b42daba1af459bde948920" UNIQUE ("nit")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_5929a7686f6f611c6022c4cecc4" UNIQUE ("nit")`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_7917f87e3719deca503c1e847e4" UNIQUE ("nit")`);
    }

}
