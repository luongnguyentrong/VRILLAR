import {MigrationInterface, QueryRunner} from "typeorm";

export class Final1687709184196 implements MigrationInterface {
    name = 'Final1687709184196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "races" (
                "race_code" character varying NOT NULL,
                "year" integer NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "winner" text NOT NULL,
                "car" character varying NOT NULL,
                "laps" integer NOT NULL,
                "time" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_3b4699d57fecd9ccbf27fafb000" PRIMARY KEY ("race_code", "year")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "username" character varying,
                "name" character varying,
                "role" character varying(30) NOT NULL DEFAULT 'STANDARD',
                "language" character varying(15) NOT NULL DEFAULT 'en-US',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "rankings" (
                "race_code" character varying NOT NULL,
                "pos" character varying NOT NULL,
                "no" integer NOT NULL,
                "driver" text NOT NULL,
                "time/retired" character varying NOT NULL,
                "car" character varying NOT NULL,
                "laps" integer NOT NULL,
                "pts" integer NOT NULL,
                "year" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1d1c6b23505c83af5e70370f559" PRIMARY KEY ("race_code", "driver", "year")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "rankings"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "races"
        `);
    }

}
