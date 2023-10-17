import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const updateById = async (
  id: number,
  pessoa: Omit<IPessoa, "id">
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.cidade)
      .where("id", "=", pessoa.cidadeId)
      .count();

    if (Number(count) === 0) return new Error("Cidade não encontrada");

    const result = await Knex(ETableNames.pessoa)
      .where("id", "=", id)
      .update(pessoa);

    if (result > 0) return;
    else return new Error("Pessoa not found");
  } catch (error) {
    return new Error("Error on update pessoa by id");
  }
};
