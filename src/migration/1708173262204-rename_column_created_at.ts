import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameColumnCreatedAt1708173262204 implements MigrationInterface {
  name = 'renameColumnCreatedAt1708173262204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "created_at" TO "createdAt"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "createdAt" TO "created_at"`,
    );
  }
}
