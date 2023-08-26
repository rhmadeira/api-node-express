import { RequestHandler } from "express";
import { ObjectSchema, ValidationError } from "yup";

type TProperty = "body" | "query" | "params" | "headers" | "cookies";

type IAllSchemas = Record<TProperty, ObjectSchema<any>>;

interface IValidation {
  (schemas: Partial<IAllSchemas>): RequestHandler;
}

export const validation: IValidation = (schemas) => async (req, res, next) => {
  const errorsResult: Record<TProperty, Record<string, string>> = {};
  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: { [key: string]: string } = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });
      errorsResult[key as TProperty] = errors;
      // return res.status(400).json({
      //   errors,
      // });
    }
  });
};
