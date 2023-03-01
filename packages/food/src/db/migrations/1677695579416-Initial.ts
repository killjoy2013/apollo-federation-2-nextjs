import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1677695579416 implements MigrationInterface {
  name = 'Initial1677695579416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "food"."restaurant_price_range_enum" AS ENUM('Cheap', 'Moderate', 'Expensive', 'Luxury')`,
    );
    await queryRunner.query(
      `CREATE TYPE "food"."restaurant_size_enum" AS ENUM('Small', 'Medium', 'Large')`,
    );
    await queryRunner.query(
      `CREATE TABLE "food"."restaurant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price_range" "food"."restaurant_price_range_enum", "size" "food"."restaurant_size_enum", "cityId" integer NOT NULL, CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "food"."meal" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "food"."restaurant_meal" ("restaurant_id" integer NOT NULL, "meal_id" integer NOT NULL, CONSTRAINT "PK_ab0aa9036bea1324d0c343d5d27" PRIMARY KEY ("restaurant_id", "meal_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4b458f38d3202b5e3c1b9a8206" ON "food"."restaurant_meal" ("restaurant_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c93f0aca5b117bb2d70e185dfe" ON "food"."restaurant_meal" ("meal_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "food"."restaurant_meal" ADD CONSTRAINT "FK_4b458f38d3202b5e3c1b9a8206f" FOREIGN KEY ("restaurant_id") REFERENCES "food"."restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "food"."restaurant_meal" ADD CONSTRAINT "FK_c93f0aca5b117bb2d70e185dfe3" FOREIGN KEY ("meal_id") REFERENCES "food"."meal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "food"."restaurant_meal" DROP CONSTRAINT "FK_c93f0aca5b117bb2d70e185dfe3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "food"."restaurant_meal" DROP CONSTRAINT "FK_4b458f38d3202b5e3c1b9a8206f"`,
    );
    await queryRunner.query(
      `DROP INDEX "food"."IDX_c93f0aca5b117bb2d70e185dfe"`,
    );
    await queryRunner.query(
      `DROP INDEX "food"."IDX_4b458f38d3202b5e3c1b9a8206"`,
    );
    await queryRunner.query(`DROP TABLE "food"."restaurant_meal"`);
    await queryRunner.query(`DROP TABLE "food"."meal"`);
    await queryRunner.query(`DROP TABLE "food"."restaurant"`);
    await queryRunner.query(`DROP TYPE "food"."restaurant_size_enum"`);
    await queryRunner.query(`DROP TYPE "food"."restaurant_price_range_enum"`);
  }
}
