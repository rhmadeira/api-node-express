import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string
): Promise<IPessoa[] | Error> => {
  try {
    const result = await Knex<IPessoa>(ETableNames.pessoa)
      .select("*")
      .where("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    return new Error("Error on get all pessoas");
  }
};
