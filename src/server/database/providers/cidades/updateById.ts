import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const updateById = async (
  id: number,
  cidade: Omit<ICidade, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.cidade)
      .where("id", "=", id)
      .update(cidade);

    if (result > 0) return;
    else return new Error("Cidade not found");
  } catch (error) {
    console.log(error);
    return new Error("Error on update cidade");
  }
};
