require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const messageRouter = require("./routes/messageRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(process.env.PORT || 5000, async () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
  await connectDB();
});
