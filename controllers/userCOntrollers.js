const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, username, password, gender, confirmPassword } = req.body;
    if (!fullName || !username || !password || !gender || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }
    const existingUser = await User.findOne({ username });
    console.log(existingUser)
    if (existingUser) {
      return res.status(400).json({ message: "username allready exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture =
    `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const user = await User.create({
      fullName,
      username,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully",status:true, data: user });
  } catch (error) {
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        status: false,
        message: `${duplicatedField} already exists`,
      });
    }
    console.log(error);
    return res.status(404).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login successful",
        status:true,
        data: {
          userId: user._id,
          fullName: user.fullName,
          username: user.username,
          profilePicture: user.profilePicture,
          gender: user.gender,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.lopgoutUser = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" })
      .json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    if (!loggedInUserId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const otherUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    if (!otherUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", data: otherUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
