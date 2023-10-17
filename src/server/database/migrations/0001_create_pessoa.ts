import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.pessoa, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).checkLength("<=", 150).notNullable().index();
      table.string("sobreNome", 150).checkLength("<=", 150).notNullable();
      table.string("email").unique().notNullable();
      table
        .bigInteger("cidadeId")
        .index()
        .references("id")
        .inTable(ETableNames.cidade)
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
        .notNullable();
      table.comment("Armazenar o nome das pessoas");
    })
    .then(() => {
      console.log(`Table ${ETableNames.pessoa} created successfully`);
    })
    .catch((err) => {
      console.log(`Error creating table ${ETableNames.cidade}: ${err}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable(ETableNames.pessoa)
    .then(() => {
      console.log(`Table ${ETableNames.pessoa} dropped successfully`);
    })
    .catch((err) => {
      console.log(`Error dropping table ${ETableNames.pessoa}: ${err}`);
    });
}
