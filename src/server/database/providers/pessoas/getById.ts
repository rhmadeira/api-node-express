import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const getById = async (id: number): Promise<IPessoa | Error> => {
  try {
    const result = await Knex<IPessoa>(ETableNames.pessoa)
      .select("*")
      .where("id", "=", id)
      .first();
    if (!result) {
      return new Error("Pessoa not found");
    }
    return result;
  } catch (error) {
    return new Error("Error on get pessoa by id");
  }
};
