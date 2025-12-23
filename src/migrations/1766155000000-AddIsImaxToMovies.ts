import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsImaxToMovies1766155000000 implements MigrationInterface {
  name = 'AddIsImaxToMovies1766155000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Thêm column IsIMAX
    await queryRunner.addColumn(
      'Movies',
      new TableColumn({
        name: 'IsIMAX',
        type: 'tinyint',
        default: 0,
      }),
    );

    // Cập nhật IsIMAX = 1 cho các phim IMAX
    await queryRunner.query(`
      UPDATE Movies 
      SET IsIMAX = 1 
      WHERE slug IN (
        'avatar-fire-and-ash',
        'zootopia-2',
        'project-hail-mary',
        'mortal-kombat-ii',
        'the-odyssey',
        'the-cat-in-the-hat'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Movies', 'IsIMAX');
  }
}
