const supertest = require("supertest");
const express = require("express");
const sinon = require("sinon");
require("sinon-mongoose");

const Cluster = require("../src/models/v1/cluster.model").model;

describe("/clusters", () => {
  const app = express();
  require("../src/routes/v1/routes")(app);
  it("should work", () => {
    const request = supertest(app);
    let test = request
      .get(`/clusters`)
      .expect("Content-Type", /json/)
      .expect(500);
  });
  it("should return all clusters", () => {
    var ClusterMock = sinon.mock(Cluster);
    var expectedResult = {
      status: true,
      clusters: []
    };
    ClusterMock.expects("find").yields(null, expectedResult);
    Cluster.find((err, result) => {
      ClusterMock.verify();
      ClusterMock.restore();
      expect(result.status).toBe(true);
    });
  });
  it("should return error", () => {
    var ClusterMock = sinon.mock(Cluster);
    var expectedResult = {
      status: false,
      error: "Something went wrong"
    };
    ClusterMock.expects("find").yields(expectedResult, null);
    Cluster.find((err, result) => {
      ClusterMock.verify();
      ClusterMock.restore();
      expect(err.status).toBe(false);
    });
  });
  it("create a new cluster", () => {
    var ClusterMock = sinon.mock(
      new Cluster({
        logging: false,
        metrics: false,
        size: "SMALL",
        ha: false,
        ocp_version: "v3.11.0",
        hosting_platform: "osp",
        tags: ["test1", "test2"]
      })
    );
    const cluster = ClusterMock.object;
    const expectedResult = {
      status: true
    };
    ClusterMock.expects("save").yields(null, expectedResult);
    cluster.save((err, result) => {
      ClusterMock.verify();
      ClusterMock.restore();
      expect(result.status).toBe(true);
    });
  });
});
