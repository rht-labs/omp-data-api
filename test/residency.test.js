const supertest = require("supertest");
const express = require("express");
const sinon = require("sinon");
require("sinon-mongoose");

const Residency = require("../src/models/v1/residency.model").model;

describe("/residency", () => {
  const app = express();
  require("../src/routes/v1/routes")(app);
  it("should work", () => {
    const request = supertest(app);
    let test = request
      .get(`/residencies`)
      .expect("Content-Type", /json/)
      .expect(500);
  });
  it("should return all residencies", () => {
    var ResidencyMock = sinon.mock(Residency);
    var expectedResult = {
      status: true,
      residencies: []
    };
    ResidencyMock.expects("find").yields(null, expectedResult);
    Residency.find((err, result) => {
      ResidencyMock.verify();
      ResidencyMock.restore();
      expect(result.status).toBe(true);
    });
  });
  it("should return error", () => {
    var ResidencyMock = sinon.mock(Residency);
    var expectedResult = {
      status: false,
      error: "Something went wrong"
    };
    ResidencyMock.expects("find").yields(expectedResult, null);
    Residency.find((err, result) => {
      ResidencyMock.verify();
      ResidencyMock.restore();
      expect(err.status).toBe(false);
    });
  });
  it("create a new residency", () => {
    var ResidencyMock = sinon.mock(
      new Residency({
        start_date: "2018-01-01",
        end_date: "2018-12-12",
        cluster_ref: "stuff",
        source_control: "git",
        name: "residency_name",
        tags: ["test1", "test2"]
      })
    );
    const residency = ResidencyMock.object;
    const expectedResult = {
      status: true
    };
    ResidencyMock.expects("save").yields(null, expectedResult);
    residency.save((err, result) => {
      ResidencyMock.verify();
      ResidencyMock.restore();
      expect(result.status).toBe(true);
    });
  });
});
