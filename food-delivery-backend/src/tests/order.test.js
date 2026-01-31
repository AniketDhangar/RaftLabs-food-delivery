import request from "supertest";
import app from "../app.js";

const email = `orderuser_${Date.now()}@test.com`;
const password = "123456";


describe("Order API", () => {
  let token;
  let menuItemId;

  beforeAll(async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Order User",
      email,
      password,
    });

  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({ email, password });

  token = loginRes.body.data.accessToken;

  const menuRes = await request(app).get("/api/menu");
  menuItemId = menuRes.body.data.data[0]._id;
});

  it("should place an order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [
          {
            menuItemId,
            quantity: 1,
          },
        ],
        deliveryAddress: "Test Address",
        phone: "9876543210",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data.totalAmount).toBeDefined();
  });
});
