import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSlugToMovies1766154700000 implements MigrationInterface {
  name = 'AddSlugToMovies1766154700000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Thêm column slug với giá trị mặc định nullable trước
    await queryRunner.addColumn(
      'Movies',
      new TableColumn({
        name: 'slug',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: true, // Tạm thời cho phép NULL
      }),
    );

    // Cập nhật slug từ OriginalTitle cho những phim hiện tại
    await queryRunner.query(`
      UPDATE Movies 
      SET slug = LOWER(
        REPLACE(
          REPLACE(
            REPLACE(
              REPLACE(
                REPLACE(
                  REPLACE(OriginalTitle, ' ', '-'),
                  ':', ''
                ),
                ',', ''
              ),
              '.', ''
            ),
            "'", ''
          ),
          '&', 'and'
        )
      )
      WHERE OriginalTitle IS NOT NULL
    `);

    // Nếu OriginalTitle NULL, lấy từ Title
    await queryRunner.query(`
      UPDATE Movies 
      SET slug = LOWER(
        REPLACE(
          REPLACE(
            REPLACE(
              REPLACE(Title, ' ', '-'),
              'á', 'a'
            ),
            'à', 'a'
          ),
          'ă', 'a'
        )
      )
      WHERE slug IS NULL
    `);

    // Sửa column slug để NOT NULL sau khi đã có dữ liệu
    await queryRunner.query(`
      ALTER TABLE Movies 
      MODIFY COLUMN slug varchar(255) NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Movies', 'slug');
  }
}
