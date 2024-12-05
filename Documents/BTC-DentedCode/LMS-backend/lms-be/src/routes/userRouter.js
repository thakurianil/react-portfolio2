import express from "express";
import { signAccessJWT, signRefreshJWT } from "../utils/jwt.js";
import { auth, refreshAuth } from "../middlewares/authMiddleware.js";
import { createNewUser, getUserByEmail } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";

const router = express.Router();

// singup
//create new user
router.post("/", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await createNewUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "Your Account has been created successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create an use try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another user alreay have this email, change your email and try again";
      error.status = 200;
    }
    next(error);
  }
});

// login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check conditions
    if (!email.includes("@") || !password) {
      throw new Error("Invalid login details");
    }

    // find user by email
    const user = await getUserByEmail(email);
    if (user?._id) {
      // verify the password
      const isPassMatched = comparePassword(password, user.password);
      if (isPassMatched) {
        // user authenticated
        // create tokens, and retun

        return res.json({
          status: "success",
          message: "user authenticated",
          tokens: {
            accessJWT: signAccessJWT({ email }),
            refreshJWT: signRefreshJWT({ email }),
          },
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid login details",
    });
  } catch (error) {
    next(error);
  }
});

// get user detail
router.get("/", auth, (req, res, next) => {
  try {
    req.userInfo.refreshJWT = undefined;

    res.json({
      status: "success",
      message: "User Profile",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/refresh-accessjwt", refreshAuth, (req, res, next) => {
  try {
    const { email } = req.userInfo;
    const accessJWT = signAccessJWT({ email });
    res.json({ accessJWT });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
