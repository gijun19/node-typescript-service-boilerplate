import express from "express";

const v1 = express.Router();

v1.get("/foo", (req, res) => {
  res.send("foo");
});

export const userApi = { v1 };
