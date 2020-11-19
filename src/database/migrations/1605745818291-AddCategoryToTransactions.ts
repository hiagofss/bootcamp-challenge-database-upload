import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCategoryToTransactions1605745818291
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({ name: 'category_id', type: 'uuid', isNullable: true }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'transactionCategory',
        referencedTableName: 'categories',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'transactionCategory');
    await queryRunner.dropColumn('transactions', 'category_id');
    await queryRunner.addColumn(
      'transactions',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
