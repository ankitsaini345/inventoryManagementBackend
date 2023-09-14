const request = require("supertest");
const { generateAuthToken } = require("../../../models/user");
const { Card } = require("../../../models/card");

let server, token, cardName;

describe("Integration", () => {
  describe("Card Model", () => {

    beforeAll(() => {
      server = require("../../../app");
      token = generateAuthToken({
        email: "testemail@gmail.com",
        roles: ["user"],
      });
    });

    afterAll(async () => {
      await Card.deleteMany({});
      server.close();
    });

    it("should give 400 if card details are missing", async () => {
      const card = {
        cardName: "test card",
      };
      const res = await request(server)
        .post("/api/cards")
        .set("authorization", token)
        .send(card);

        expect(res.status).toBe(400);
    });

    it("should insert a valid card into database", async () => {
      const card = {
        cardNumber: 8347583475834,
        cardName: "test card",
      };
      const res = await request(server)
        .post("/api/cards")
        .set("authorization", token)
        .send(card);
      cardName = res.body.cardName;
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(card);
    });

    it("should get a card using id", async () => {
      const res = await request(server)
        .get(`/api/cards/${cardName}`)
        .set("authorization", token)

      expect(res.status).toBe(200);
      expect(res.body.cardName).toBe(cardName);
    });

    it("should return 400 id card not found", async () => {
      const res = await request(server)
        .get(`/api/cards/tempCard`)
        .set("authorization", token)

      expect(res.status).toBe(400);
      expect(res.body).toBeUndefined;
    });
  });
});
