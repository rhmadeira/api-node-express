import knex from "knex";
import { development, prod, test } from "./environment";
import pg from "pg";

if (process.env.NODE_ENV === "production") {
  pg.types.setTypeParser(20, "text", parseInt);
}

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return prod;
    case "test":
      return test;
    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
