import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(ETableNames.usuario, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).checkLength("<=", 150).notNullable();
      table.string("senha").unique().checkLength(">", 6).notNullable();
      table.string("email").unique().index().notNullable();
      table.comment("Tabela de usuários do sistema");
    })
    .then(() => {
      console.log(`Table ${ETableNames.usuario} created successfully`);
    })
    .catch((err) => {
      console.log(`Error creating table ${ETableNames.cidade}: ${err}`);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable(ETableNames.usuario)
    .then(() => {
      console.log(`Table ${ETableNames.usuario} dropped successfully`);
    })
    .catch((err) => {
      console.log(`Error dropping table ${ETableNames.usuario}: ${err}`);
    });
}
