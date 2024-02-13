import { User } from "./models/user";
import http from "http";
import { getAllUsers } from "./methods/get_all_persons";
import { createNewUser } from "./methods/create_new_user";
import { getUserById } from "./methods/get_user_by_id";
import { deleteUserById } from "./methods/delete_user";
import { updateUserById } from "./methods/update_existing_user";
import { cannotFindError } from "./utils/cannot_find_resource";
import dotenv from "dotenv";
dotenv.config();

const users: User[] = [];

export const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getAllUsers(res, users);
  } else if (req.url!.startsWith("/api/users/") && req.method === "GET") {
    getUserById(req, res, users);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createNewUser(res, req, users);
  } else if (req.url!.startsWith("/api/users/") && req.method === "PUT") {
    updateUserById(req, res, users);
  } else if (req.url!.startsWith("/api/users/") && req.method === "DELETE") {
    deleteUserById(req, res, users);
  } else {
    cannotFindError(res);
  }
});

const PORT = process.env.PORT || 3500;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
