import { compare, genSalt, hash } from "bcryptjs";

const SALT_ROUNDS = 6;

const hashPassword = async (password: string) => {
  const saltGenerator = await genSalt(SALT_ROUNDS);
  const hashPass = await hash(password, saltGenerator);

  return hashPass;
};

const verifyPassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export const passwordCrypto = {
  hashPassword,
  verifyPassword,
};
