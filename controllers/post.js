import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  // 判断是否携带token
  if (!token) return res.status(401).json("Not Logged in!");

  // 判断登录是否过期
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    /* 
      SELECT p.*,u.id AS userId,name,profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
      这段sql代码 选择了posts表和users表 对应的users发布的posts
      LEFT JOIN relationships AS r ON (p.userId = r.followedUserId ) WHERE r.followerUserId = ? OR p.userId = ?
      加上这段 再选择出 relationships表中，自己的关注 与 自己发布的posts
      //followedUserId 我关注的人的id     followerUserId 我自己的id
    */
    const q = `SELECT p.*,u.id AS userId,name,profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
  LEFT JOIN relationships AS r ON (p.userId = r.followedUserId ) WHERE r.followerUserId = ? OR p.userId = ?
  ORDER BY p.createdAt DESC
  `;
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  console.log("addpost");
  const token = req.cookies.accessToken;
  // 判断是否携带token
  if (!token) return res.status(401).json("Not Logged in!");

  // 判断登录是否过期
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?) ";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created");
    });
  });
};
