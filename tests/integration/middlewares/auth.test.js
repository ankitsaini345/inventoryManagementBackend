const request = require("supertest");
const { generateAuthToken } = require("../../../models/user");

let server, token;

describe("integration | auth middleware", () => {
  beforeEach(() => {
    server = require("../../../app");
    token = generateAuthToken({
      email: "testemail@gmail.com",
      roles: ["user"],
    });
  });
  afterEach(() => {
    server.close();
  });

  it("should return 400 status if token not present", async () => {
    const res = await request(server)
    .get('/api/cards')
    expect(res.status).toBe(400);
  });

  it("should return 401 status if token is invalid", async () => {
    const res = await request(server)
    .get('/api/cards')
    .set('authorization', 'testtoken')
    expect(res.status).toBe(401);
  });

  it("should return cards if token is valid", async () => {
    const res = await request(server)
    .get('/api/cards')
    .set('authorization', token)
    expect(res.status).toBe(200);
  });
});
