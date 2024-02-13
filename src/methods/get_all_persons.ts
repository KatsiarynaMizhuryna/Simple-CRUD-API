import { User } from "src/models/user";
import http from "http";
import { statusCode } from "src/utils/statuscode";
import { InternalServerError } from "../utils/server_error";

export const getAllUsers = async (
  res: http.ServerResponse,
  users: User[]
): Promise<void> => {
  try {
    res.writeHead(statusCode.Ok, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    InternalServerError(error, res);
  }
};
