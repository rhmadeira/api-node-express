import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IPessoa[] | Error> => {
  try {
    const result = await Knex<IPessoa>(ETableNames.pessoa)
      .select("*")
      .where("id", "=", Number(id))
      .orWhere("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((pessoa) => pessoa.id !== id)) {
      const resultById = await Knex(ETableNames.pessoa)
        .select("*")
        .where("id", "=", Number(id))
        .first();
      if (resultById) {
        return [...result, resultById];
      }
    }

    return result;
  } catch (error) {
    return new Error("Error on get all pessoas");
  }
};
