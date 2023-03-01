import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1677696025824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO food.restaurant (id, "name", "cityId")
        VALUES (1, 'Hunger', 5),
               (2, 'La Maison', 2),
               (3, 'Rouge', 2),
               (4, 'Croissant', 2),
               (5, 'Noma', 5),
               (6, 'Best Teppenyaki', 3);
               SELECT setval('food.restaurant_id_seq', 7) 
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
