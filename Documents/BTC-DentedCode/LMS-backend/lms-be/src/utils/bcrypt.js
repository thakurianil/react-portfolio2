import bcrypt from "bcrypt";
const saltRound = 10;

// hashin function
export const hashPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass, saltRound);
};

// comparing password
export const comparePassword = (plainPass, hashPassword) => {
  return bcrypt.compareSync(plainPass, hashPassword);
};
