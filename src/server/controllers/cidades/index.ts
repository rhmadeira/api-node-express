import * as create from "./create";
import * as getById from "./getById";
import * as getAll from "./getAll";
import * as update from "./update";
import * as deleteById from "./deleteById";

export const cidadesController = {
  ...create,
  ...getById,
  ...getAll,
  ...update,
  ...deleteById,
};
