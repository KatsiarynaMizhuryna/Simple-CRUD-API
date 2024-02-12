import { User } from "../models/user";
import http from "http";
import { statusCode } from "src/utils/statuscode";

export const deleteUserById = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  users: User[]
): Promise<void> => {
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

  users.splice(userIndex, 1);

  res.writeHead(statusCode.No_Content, {
    "Content-Type": "application/json",
  });
  res.end();
};
