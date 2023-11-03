import { passwordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const create = async (
  usuario: Omit<IUsuario, "id">
): Promise<number | Error> => {
  try {
    const hashPassword = await passwordCrypto.hashPassword(usuario.senha);
    usuario.senha = hashPassword;
    const [result] = await Knex(ETableNames.usuario)
      .insert(usuario)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    } else {
      return new Error("Erro ao criar registro");
    }
  } catch (error) {
    return new Error("Erro ao criar registro");
  }
};
