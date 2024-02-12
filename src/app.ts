import { User, createUser } from "./models/user";
import http from "http";
import { getAllUsers } from "./methods/get_all_persons";

const users: User[] = [];

const server = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(users));
    getAllUsers(res, users);
  } else if (req.url === "/api/users" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const { username, age, hobbies } = JSON.parse(data);

      if (!username || !age) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: "Username and age are required fields" })
        );
      } else {
        const newUser = createUser(username, age, hobbies || []);
        users.push(newUser);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

const PORT = process.env.PORT || 3500;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
