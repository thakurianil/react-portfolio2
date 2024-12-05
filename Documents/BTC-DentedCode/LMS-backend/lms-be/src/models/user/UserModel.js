import UserSchema from "./UserSchema.js";

// create user function
export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};

// get user by email
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

// update user
export const updateUser = async (filter, obj) => {
  return await UserSchema.findOneAndUpdate(filter, obj);
};

// delete function
