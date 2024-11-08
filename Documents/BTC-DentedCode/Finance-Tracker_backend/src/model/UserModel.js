import UserSchema from "../schema/UserSchema.js";

export const addUser = (obj) => {
  return UserSchema(obj).save();
};

export const getUser = (email) => {
  return UserSchema.findOne({ email });
};
