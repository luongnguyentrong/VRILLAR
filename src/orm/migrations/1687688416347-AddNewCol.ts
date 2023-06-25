import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNewCol1687688416347 implements MigrationInterface {
    name = 'AddNewCol1687688416347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rankings" (
                "race_code" character varying NOT NULL,
                "pos" character varying NOT NULL,
                "no" integer NOT NULL,
                "driver" text NOT NULL,
                "time/retired" TIMESTAMP NOT NULL,
                "car" character varying NOT NULL,
                "laps" integer NOT NULL,
                "pts" integer NOT NULL,
                "year" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1d1c6b23505c83af5e70370f559" PRIMARY KEY ("race_code", "driver", "year")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "races"
            ADD "year" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "races" DROP CONSTRAINT "PK_ab41bd227697eea5ee9386639d4"
        `);
        await queryRunner.query(`
            ALTER TABLE "races"
            ADD CONSTRAINT "PK_3b4699d57fecd9ccbf27fafb000" PRIMARY KEY ("race_code", "year")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "races" DROP CONSTRAINT "PK_3b4699d57fecd9ccbf27fafb000"
        `);
        await queryRunner.query(`
            ALTER TABLE "races"
            ADD CONSTRAINT "PK_ab41bd227697eea5ee9386639d4" PRIMARY KEY ("race_code")
        `);
        await queryRunner.query(`
            ALTER TABLE "races" DROP COLUMN "year"
        `);
        await queryRunner.query(`
            DROP TABLE "rankings"
        `);
    }

}
