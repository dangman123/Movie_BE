import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBannerTable1759814027465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Banners',
                columns: [
                    {
                        name: 'BannerID',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'Title',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'Description',
                        type: 'varchar',
                        length: '500',
                        isNullable: true,
                    },
                    {
                        name: 'ImageURL',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'MobileImageURL',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'LinkURL',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'BannerType',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'MovieID',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'PromotionID',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'DisplayOrder',
                        type: 'int',
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'StartDate',
                        type: 'datetime',
                        isNullable: false,
                    },
                    {
                        name: 'EndDate',
                        type: 'datetime',
                        isNullable: false,
                    },
                    {
                        name: 'IsActive',
                        type: 'tinyint',
                        default: 1,
                        isNullable: false,
                    },
                    {
                        name: 'CreatedAt',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                    {
                        name: 'UpdatedAt',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['MovieID'],
                        referencedTableName: 'Movies',
                        referencedColumnNames: ['MovieID'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                    {
                        columnNames: ['PromotionID'],
                        referencedTableName: 'Promotions',
                        referencedColumnNames: ['PromotionID'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE',
                    },
                ],
                indices: [
                    {
                        name: 'IDX_Banner_Type',
                        columnNames: ['BannerType'],
                    },
                    {
                        name: 'IDX_Banner_Active',
                        columnNames: ['IsActive'],
                    },
                    {
                        name: 'IDX_Banner_DisplayOrder',
                        columnNames: ['DisplayOrder'],
                    },
                    {
                        name: 'IDX_Banner_DateRange',
                        columnNames: ['StartDate', 'EndDate'],
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Banners');
    }

}
