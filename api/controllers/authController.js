import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// Register User
const register = async (req, res) => {
  try {
    // Hash and salt the user's password
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);

    // Create a new user in the database
    const newUser = await User.create({
      // Keep all other fields from the request body, but replace password with the hashed version
      ...req.body,
      password: hashedPassword,
    });

    // Remove password from the response
    newUser.password = null;

    // Send response to client
    return res
      .status(201)
      .json({ message: "Registration successful", user: newUser });
  } catch (err) {
    // Handle errors and send response
    const errorObject = error(400, "An error occurred during registration");

    console.log(err);

    return res
      .status(errorObject.status)
      .json({ message: errorObject.message });
  }
};

// Login User
const login = async (req, res) => {
  console.log(req.body);

  try {
    // Find user in the database
    const user = await User.findOne({ username: req.body.username });

    // If user not found, send error
    if (!user)
      return res.status(404).json({
        message: "Incorrect login credentials. Please check your username and password.",
      });

    // Compare password
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    console.log(isCorrect);

    // If password is incorrect, send error
    if (!isCorrect)
      return res.status(404).json({
        message: "Incorrect login credentials. Please check your username and password.",
      });

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, isSeller: user.isSeller },
      process.env.JWT_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    // Remove password from response
    user.password = null;

    // Send response and set cookie
    // Note: Cookies only work in browsers. For mobile apps or desktop apps, cookies may not be available.
    // sameSite: If frontend and backend share the same domain, default is true. If different domains, set to "none".
    res
      .cookie("token", token, { httpOnly: true, sameSite: "none" })
      .status(200)
      // To support mobile and desktop apps, send the token in JSON as well
      .json({ message: "Login successful", user, token });

  } catch (err) {
    // Handle errors
    const errorObject = error(400, "An error occurred during login");

    return res
      .status(errorObject.status)
      .json({ message: errorObject.message });
  }
};

// Logout User
const logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token").status(200).json({
    message: "Logout successful",
  });
};

export { register, login, logout };














