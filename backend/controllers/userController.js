import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc Auth a user (Email/Password) & get token, then send back data (a token to save on the client)
// @route POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // get the user making the the request by getting their email for the req.body
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export { authUser };
