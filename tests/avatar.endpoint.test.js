const { before } = require("mocha");
let chai = require("chai");
// let chaiHttp = require("chai-http");
let server = require("../app");
const { expect } = require("chai");

// chai.use(chaiHttp);
// describe("Auth Controller Test Suite", () => {
//   before(async () => {
//     chai.request(server);
//   });

describe("PATCH /users/avatars", () => {
  context("when validation fails", () => {
    it("should return 400 error", async () => {
      await request(server)
        .post("/users/avatars")
        .send({ username: "test" })
        .expect(400);
    });
  });
});
