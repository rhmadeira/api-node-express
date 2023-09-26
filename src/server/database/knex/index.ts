import knex from "knex";
import { development, prod, test } from "./environment";

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
