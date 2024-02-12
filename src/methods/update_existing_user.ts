import { User } from "src/models/user";
import http from "http";
import { statusCode } from "src/utils/statuscode";
import { InternalServerError } from "../utils/server_error";

export const updateUserById = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  users: User[]
): Promise<void> => {
  try {
    const userId: string = req.url!.split("/")[3];
    if (!userId.match(/[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}/i)) {
      res.writeHead(statusCode.Bad_Request, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ error: "Invalid userId format" }));
      return;
    }
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      res.writeHead(statusCode.Not_Found, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ error: "User not found" }));
      return;
    }
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const { username, age, hobbies } = JSON.parse(data);
      const updatedUser = { id: userId, username, age, hobbies };
      users[userIndex] = updatedUser;
      res.writeHead(statusCode.Ok, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedUser));
    });
  } catch (error) {
    InternalServerError(error, res);
  }
};
