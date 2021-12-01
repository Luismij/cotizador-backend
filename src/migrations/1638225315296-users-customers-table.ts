import {MigrationInterface, QueryRunner} from "typeorm";

export class usersCustomersTable1638225315296 implements MigrationInterface {
    name = 'usersCustomersTable1638225315296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internalComment" character varying(300), "address" character varying NOT NULL, "unit" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internalComment" character varying(300), "name" character varying NOT NULL, "logo" character varying, "nit" character varying NOT NULL, "email" character varying, "socialReason" character varying, "phone" character varying, "webpage" character varying, "address" character varying, CONSTRAINT "UQ_7917f87e3719deca503c1e847e4" UNIQUE ("nit"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internalComment" character varying(300), "name" character varying NOT NULL, "logo" character varying, "nit" character varying NOT NULL, "email" character varying, "socialReason" character varying, "phone" character varying, "webpage" character varying, "address" character varying, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_5929a7686f6f611c6022c4cecc4" UNIQUE ("nit"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "internalComment" character varying(300), "name" character varying NOT NULL, "logo" character varying, "nit" character varying NOT NULL, "email" character varying, "socialReason" character varying, "phone" character varying, "webpage" character varying, "address" character varying, "contact" character varying, "userId" integer, CONSTRAINT "UQ_a33a6b42daba1af459bde948920" UNIQUE ("nit"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_3f62b42ed23958b120c235f74df"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
