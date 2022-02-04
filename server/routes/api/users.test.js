/* условия проверки:
- статус-код 200
- возвращается токен
- возвращается объект user с 3 полями name, email и avatar, имеющие тип данных String
 */

const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");

const { DB_HOST_TEST } = process.env;

describe("test users", () => {
  let server;
  beforeAll(() => (server = app.listen(4000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  test("test login route", async () => {
    const user = {
      email: "alex@mail.com",
      password: "123450",
    };

    const response = await request(app).post("/api/users/login").send(user);

    expect(response.statusCode).toBe(200);
    const isToken = response.body.token.split(".").length;
    expect(isToken).toBe(3);
    expect(typeof response.body.user.name).toBe("string");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.avatar).toBe("string");
  });
});
