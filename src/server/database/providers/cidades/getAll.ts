import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getAll = async (): Promise<ICidade[] | Error> => {
  try {
    const result = await Knex(ETableNames.cidade).select("*");
    return result;
  } catch (error) {
    return Error("Error on get all cidades");
  }
};
