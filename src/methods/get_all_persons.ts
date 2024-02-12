import { User } from "src/models/user";
import http from "http";
import { statusCode } from "src/utils/statuscode";

export const getAllUsers = async (
  res: http.ServerResponse,
  users: User[]
): Promise<void> => {
  res.writeHead(statusCode.Ok, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
};
