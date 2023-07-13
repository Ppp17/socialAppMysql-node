import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// 中间件
app.use((req, res, next) => {
  // 设置允许跨域的域名， *代表允许任意域名跨域
  /* res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "*");
  // 跨域允许的请求方式
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,DELETE,PATCH,OPTIONS"
  );
  next(); */
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

const port = 8800;

app.all("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`API working!It's on port ${port}`);
});
