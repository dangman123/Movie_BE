import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCreatedAtToMovies1766155200000 implements MigrationInterface {
  name = 'AddCreatedAtToMovies1766155200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Thêm column createdAt
    await queryRunner.addColumn(
      'Movies',
      new TableColumn({
        name: 'createdAt',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Movies', 'createdAt');
  }
}
