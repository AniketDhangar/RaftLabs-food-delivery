import request from "supertest";
import app from "../app.js";

describe("Menu API", () => {
  it("should fetch menu list", async () => {
    const res = await request(app).get("/api/menu");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });
});
