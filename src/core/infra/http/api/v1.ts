import express from "express";
import { userApi } from "~/modules/user/infra/http/api/userApi";

const v1 = express.Router();

v1.use("/users", userApi.v1);

export { v1 };
