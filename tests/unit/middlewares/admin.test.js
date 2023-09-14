const admin = require("../../../middleware/admin");
const auth = require("../../../middleware/auth");
const { generateAuthToken } = require("../../../models/user");

describe('admin middleware',()=> {
    it("should return 403 if admin role not present", () => {
        const payload = { email: "testemail@gmail.com", roles: ["user"] };
        const token = generateAuthToken(payload);
    
        const req = {
          headers: {
            authorization: token,
          },
        };
        const res = {
            status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
        const next = jest.fn();
        const adminNext = jest.fn();
    
        auth(req, res, next);
        admin(req, res, adminNext)
    
        expect(res.status).toHaveBeenCalledWith(403);
        expect(adminNext).not.toHaveBeenCalled();
      });


      it("should pass if admin role present", () => {
        const payload = { email: "testemail@gmail.com", roles: ["admin"] };
        const token = generateAuthToken(payload);
    
        const req = {
          headers: {
            authorization: token,
          },
        };
        const res = {
            status: jest.fn().mockReturnValue({ json: jest.fn() }),
        };
        const next = jest.fn();
        const adminNext = jest.fn();
    
        auth(req, res, next);
        admin(req, res, adminNext)
    
        expect(adminNext).toBeCalled();
      });
})