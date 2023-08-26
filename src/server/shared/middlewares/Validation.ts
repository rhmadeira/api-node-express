import { RequestHandler } from "express";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";

type TProperty = "body" | "query" | "params" | "headers" | "cookies";

type TGetSchema = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T>
) => ObjectSchema<T>;

type IAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getScehma: TGetSchema) => Partial<IAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};
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
        errorsResult[key] = errors;
      }
    });

    if (Object.keys(errorsResult).length > 0) {
      return res.status(400).json({
        errors: errorsResult,
      });
    } else {
      return next();
    }
  };
