import { User } from "src/models/user";
import http from "http";
import { statusCode } from "src/utils/statuscode";

export const getUserById = async (
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

  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.writeHead(statusCode.Not_Found, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "User not found" }));
    return;
  }

  res.writeHead(statusCode.Ok, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
};
