import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCol1687688716843 implements MigrationInterface {
    name = 'UpdateCol1687688716843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rankings" DROP COLUMN "time/retired"
        `);
        await queryRunner.query(`
            ALTER TABLE "rankings"
            ADD "time/retired" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rankings" DROP COLUMN "time/retired"
        `);
        await queryRunner.query(`
            ALTER TABLE "rankings"
            ADD "time/retired" TIMESTAMP NOT NULL
        `);
    }

}
