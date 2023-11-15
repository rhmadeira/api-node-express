import { Knex } from "knex";
import path from "path";

export const development: Knex.Config = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "database.sqlite"
    ),
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  pool: {
    afterCreate: (conn: any, done: Function) => {
      conn.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};

export const test: Knex.Config = {
  ...development,
  connection: ":memory:",
};

export const prod: Knex.Config = {
  client: "pg",
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
