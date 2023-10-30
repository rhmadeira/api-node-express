import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.usuario)
      .where("email", "=", email)
      .first();

    if (typeof result === "object") {
      return result;
    } else {
      return new Error("Erro ao buscar registro");
    }
  } catch (error) {
    return new Error("Erro ao buscar registro");
  }
};
