import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1637378757068 implements MigrationInterface {
    name = 'CreateUserTable1637378757068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createDateTime"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastChangedDateTime"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastChangedBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "internalComment"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdBy" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastChangedBy" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "internalComment" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "internalComment"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastChangedBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastChangedDateTime"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createDateTime"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "internalComment" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastChangedBy" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdBy" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
