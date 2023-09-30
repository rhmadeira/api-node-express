import * as deleteById from "./deleteById";
import * as getAll from "./getAll";
import * as getById from "./getById";
import * as create from "./create";
import * as updateById from "./updateById";

export const cidadesController = {
  ...create,
  ...getById,
  ...getAll,
  ...updateById,
  ...deleteById,
};
