const supertest = require("supertest");
const express = require("express");
const sinon = require("sinon");
require("sinon-mongoose");

const Group = require("../src/models/v1/group.model").model;

describe("/groups", () => {
  const app = express();
  require("../src/routes/v1/routes")(app);
  it("should work", () => {
    const request = supertest(app);
    let test = request
      .get(`/groups`)
      .expect("Content-Type", /json/)
      .expect(500);
  });
  it("should return all groups", () => {
    var GroupMock = sinon.mock(Group);
    var expectedResult = {
      status: true,
      groups: []
    };
    GroupMock.expects("find").yields(null, expectedResult);
    Group.find((err, result) => {
      GroupMock.verify();
      GroupMock.restore();
      expect(result.status).toBe(true);
    });
  });
  it("should return error", () => {
    var GroupMock = sinon.mock(Group);
    var expectedResult = {
      status: false,
      error: "Something went wrong"
    };
    GroupMock.expects("find").yields(expectedResult, null);
    Group.find((err, result) => {
      GroupMock.verify();
      GroupMock.restore();
      expect(err.status).toBe(false);
    });
  });
  it("create a new group", () => {
    var GroupMock = sinon.mock(
      new Group({
        group_name: "TestGroup",
        display_name: "Test Group",
        tags: ["test1", "test2"]
      })
    );
    const group = GroupMock.object;
    const expectedResult = {
      status: true
    };
    GroupMock.expects("save").yields(null, expectedResult);
    group.save((err, result) => {
      GroupMock.verify();
      GroupMock.restore();
      expect(result.status).toBe(true);
    });
  });
});
