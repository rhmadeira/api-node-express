import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";
interface ICreateProps {
  pessoa: Omit<IPessoa, "id">;
}

export const create = async (
  pessoa: Omit<IPessoa, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.pessoa)
      .insert(pessoa)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    } else {
      return new Error("Error on create pessoa");
    }
  } catch (error) {
    return new Error("Error on create pessoa");
  }
};
