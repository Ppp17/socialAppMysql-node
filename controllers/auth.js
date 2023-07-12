import { db } from "../connect.js";
import bcrypt from "bcryptjs";
export const register = (req, res) => {
  // 判断用户是否存在
  const q = "SELECT FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exist!");
    // 创建新用户
    //hash the password 处理密码
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q =
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];
    db.query(q, [values], (err, data) => {});
  });
};
export const login = (req, res) => {};
export const logout = (req, res) => {};
