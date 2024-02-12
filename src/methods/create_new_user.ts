import { User, createUser } from "../models/user";
import http from "http";
import { statusCode } from "src/utils/statuscode";

export const createNewUser = async (
  res: http.ServerResponse,
  req: http.IncomingMessage,
  users: User[]
) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    const { username, age, hobbies } = JSON.parse(data);

    if (!username || !age) {
      res.writeHead(statusCode.Bad_Request, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({ error: "Username and age are required fields" })
      );
    } else {
      const newUser = createUser(username, age, hobbies || []);
      users.push(newUser);
      res.writeHead(statusCode.Created, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    }
  });
};
