import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1721106006204 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" rename column "name" to "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" rename column "title" to "name"`,
    );
  }
}
