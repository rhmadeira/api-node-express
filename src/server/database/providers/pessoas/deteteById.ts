import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.pessoa).where("id", "=", id).del();

    if (result > 0) return;
    return new Error("Error on delete pessoa by id");
  } catch (error) {
    return new Error("Error on delete pessoa by id");
  }
};
