import * as create from "./Create";
import * as getById from "./GetById";
import * as getAll from "./GetAll";
import * as update from "./Update";
import * as deleteById from "./Delete";

export const CidadesController = {
  ...create,
  ...getById,
  ...getAll,
  ...update,
  ...deleteById,
};
