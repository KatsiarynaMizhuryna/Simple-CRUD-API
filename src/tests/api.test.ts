import request from "supertest";
import { server } from "../app";

describe("API Tests", () => {
  let createdUserId: string;
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  it("should get all records with a GET api/users request (expect an empty array)", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should create a new object by a POST api/users request", async () => {
    const response = await request(server)
      .post("/api/users")
      .send({ username: "TestUser", age: 25, hobbies: ["TestHobby"] });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    createdUserId = response.body.id;
  });

  it("should get the created record by its id with a GET api/users/{userId} request", async () => {
    const response = await request(server).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUserId);
  });

  it("should update the created record with a PUT api/users/{userId} request", async () => {
    const response = await request(server)
      .put(`/api/users/${createdUserId}`)
      .send({ username: "UpdatedUser", age: 30, hobbies: ["UpdatedHobby"] });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdUserId);
    expect(response.body.username).toBe("UpdatedUser");
    expect(response.body.age).toBe(30);
    expect(response.body.hobbies).toEqual(["UpdatedHobby"]);
  });

  it("should delete the created object by id with a DELETE api/users/{userId} request", async () => {
    const response = await request(server).delete(
      `/api/users/${createdUserId}`
    );
    expect(response.status).toBe(204);
  });

  it("should not find the deleted object by id with a GET api/users/{userId} request", async () => {
    const response = await request(server).get(`/api/users/${createdUserId}`);
    expect(response.status).toBe(404);
  });
});
