const supertest = require("supertest");
const express = require("express");
const sinon = require("sinon");
require("sinon-mongoose");

const User = require("../src/models/v1/user.model").model;

describe("/user", () => {
  const app = express();
  require("../src/routes/v1/routes")(app);
  it("should work", () => {
    const request = supertest(app);
    let test = request
      .get(`/users`)
      .expect("Content-Type", /json/)
      .expect(500);
  });
  it("should return all users", () => {
    var UserMock = sinon.mock(User);
    var expectedResult = {
      status: true,
      users: []
    };
    UserMock.expects("find").yields(null, expectedResult);
    User.find((err, result) => {
      UserMock.verify();
      UserMock.restore();
      expect(result.status).toBe(true);
    });
  });
  it("should return error", () => {
    var UserMock = sinon.mock(User);
    var expectedResult = {
      status: false,
      error: "Something went wrong"
    };
    UserMock.expects("find").yields(expectedResult, null);
    User.find((err, result) => {
      UserMock.verify();
      UserMock.restore();
      expect(err.status).toBe(false);
    });
  });
  it("create a new user", () => {
    var UserMock = sinon.mock(
      new User({
        user_name: "TestUser",
        first_name: "Test",
        last_name: "User",
        expiration_date: Date.now(),
        email: "testuser@Example.com",
        identity_providers: {
          "anything_can_be_here!": "see_anything!"
        },
        tags: ["test1", "test2"]
      })
    );
    const user = UserMock.object;
    const expectedResult = {
      status: true
    };
    UserMock.expects("save").yields(null, expectedResult);
    user.save((err, result) => {
      UserMock.verify();
      UserMock.restore();
      expect(result.status).toBe(true);
    });
  });
});
