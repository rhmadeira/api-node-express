import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.cidade, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).notNullable().index();
      table.comment("Armazenar o mome das cidades");
    })
    .then(() => {
      console.log(`Table ${ETableNames.cidade} created successfully`);
    })
    .catch((err) => {
      console.log(`Error creating table ${ETableNames.cidade}: ${err}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable(ETableNames.cidade)
    .then(() => {
      console.log(`Table ${ETableNames.cidade} dropped successfully`);
    })
    .catch((err) => {
      console.log(`Error dropping table ${ETableNames.cidade}: ${err}`);
    });
}
