import JWT from "jsonwebtoken";
import { insertToken } from "../models/session/SessionSchema.js";
import { config } from "../config/config.js";
import { updateUser } from "../models/user/UserModel.js";

export const signAccessJWT = (payload) => {
  const token = JWT.sign(payload, config.jwt.secret, {
    expiresIn: "15m",
  });
  insertToken({ token });
  return token;
};

// verify acess jwt
export const verifyAccessJWT = (token) => {
  try {
    return JWT.verify(token, config.jwt.secret);
  } catch (error) {
    return error.message === "jwt expired" ? "jwt expired" : "Invalid Token";
  }
};

// create refresh jwt
export const signRefreshJWT = ({ email }) => {
  const refreshJWT = JWT.sign({ email }, config.jwt.refreshSecret, {
    expiresIn: "30d",
  });
  updateUser({ email }, { refreshJWT });
  return refreshJWT;
};

// verify refresh jwt

export const verifyRefreshJWT = (token) => {
  try {
    return JWT.verify(token, config.jwt.refreshSecret);
  } catch (error) {
    return "Invalid Token";
  }
};
