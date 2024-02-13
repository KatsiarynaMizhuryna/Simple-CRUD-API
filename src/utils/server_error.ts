import http from "http";
import { statusCode } from "src/utils/statuscode";

export const InternalServerError = async (
  error: Error,
  res: http.ServerResponse
) => {
  console.error("Internal Server Error:", error);
  res.writeHead(statusCode.Internal_Server_Error, {
    "Content-Type": "text/plain",
  });
  res.end("500 Internal Server Error");
};
