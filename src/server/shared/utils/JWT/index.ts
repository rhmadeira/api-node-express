import * as jwt from "jsonwebtoken";

interface IJwtData {
  uid: number;
}

const signIn = (data: IJwtData): string | "JWT_SECRET_NOT_FOUND" => {
  if (!process.env.JWT_SECRET) {
    return "JWT_SECRET_NOT_FOUND";
  }
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const verify = (
  toke: string
): "JWT_SECRET_NOT_FOUND" | "Invalid token" | IJwtData => {
  if (process.env.JWT_SECRET === undefined) {
    return "JWT_SECRET_NOT_FOUND";
  }
  try {
    const decoded = jwt.verify(toke, process.env.JWT_SECRET);
    if (typeof decoded === "string") {
      return "Invalid token";
    }
    return decoded as IJwtData;
  } catch (error) {
    return "Invalid token";
  }
};

export const JWTService = {
  signIn,
  verify,
};
