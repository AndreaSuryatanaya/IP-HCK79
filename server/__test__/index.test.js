const request = require("supertest");
const app = require("../app"); // Pastikan ini sesuai dengan file `app.js` kamu
const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePass } = require("../helpers/hashPassword");

jest.mock("../helpers/geminiAi", () =>
  jest.fn(() => Promise.resolve({ response: "Test AI Response" }))
);

describe("Auth Controller Tests", () => {
  let token;
  let testUser;

  beforeAll(async () => {
    testUser = await User.create({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    token = signToken({ id: testUser.id, email: testUser.email });
  });

  afterAll(async () => {
    await User.destroy({ where: { email: "test@example.com" } });
  });

  test("POST /register - should register a new user", async () => {
    const res = await request(app).post("/register").send({
      username: "newuser",
      email: "new@example.com",
      password: "newpassword123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("email", "new@example.com");
  });

  test("POST /login - should login user and return token", async () => {
    const res = await request(app).post("/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("access_token");
  });

  test("POST /login - should fail with incorrect password", async () => {
    const res = await request(app).post("/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
  });

  test("POST /gemini - should return AI response", async () => {
    const res = await request(app)
      .post("/gemini")
      .set("Authorization", `Bearer ${token}`)
      .send({ input: "Hello, AI" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("response", "Test AI Response");
  });
});
