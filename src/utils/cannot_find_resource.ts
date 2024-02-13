import http from "http";
import { statusCode } from "src/utils/statuscode";

export const cannotFindError = async (res: http.ServerResponse) => {
  res.writeHead(statusCode.Not_Found, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
};
