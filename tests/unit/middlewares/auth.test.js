const auth = require("../../../middleware/auth");
const { generateAuthToken } = require("../../../models/user");

describe("auth middleware", () => {
  it("should return 401 if req do not has valid token", () => {
    const payload = { email: "testemail@gmail.com", roles: ["user"] };
    const token = generateAuthToken(payload);

    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
      setHeader: jest.fn()
    };
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toBeUndefined();
    expect(res.status).toBeCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return error if req has invalid token", () => {
    const token = 'iudvhasidvhashvkasvkashv'

    const req = {
      headers: {
        authorization: token,
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({ json: jest.fn() }),
    };
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toBeUndefined();
    expect(res.status).toBeCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should add user in req if req has valid token", () => {
    const payload = { email: "testemail@gmail.com", roles: ["user"] };
    const token = generateAuthToken(payload);

    const req = {
      headers: {
        authorization: token,
      },
    };
    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user).toMatchObject(payload);
    expect(next).toBeCalled();
  });
});
