const supertest = require("supertest");
const express = require("express");
const sinon = require("sinon");
require("sinon-mongoose");

const Customer = require("../src/models/v1/customer.model").model;

describe("/customers", () => {
  const app = express();
  require("../src/routes/v1/routes")(app);
  it("should work", () => {
    const request = supertest(app);
    let test = request
      .get(`/customers`)
      .expect("Content-Type", /json/)
      .expect(500);
  });
  it("should return all customers", () => {
    var CustomerMock = sinon.mock(Customer);
    var expectedResult = {
      status: true,
      customers: []
    };
    CustomerMock.expects("find").yields(null, expectedResult);
    Customer.find((err, result) => {
      CustomerMock.verify();
      CustomerMock.restore();
      expect(result.status).toBe(true);
    });
  });
  it("should return error", () => {
    var CustomerMock = sinon.mock(Customer);
    var expectedResult = {
      status: false,
      error: "Something went wrong"
    };
    CustomerMock.expects("find").yields(expectedResult, null);
    Customer.find((err, result) => {
      CustomerMock.verify();
      CustomerMock.restore();
      expect(err.status).toBe(false);
    });
  });
  it("create a new customer", () => {
    var CustomerMock = sinon.mock(
      new Customer({
        customer_name: "Super Real Customer",
        tags: ["test1", "test2"]
      })
    );
    const customer = CustomerMock.object;
    const expectedResult = {
      status: true
    };
    CustomerMock.expects("save").yields(null, expectedResult);
    customer.save((err, result) => {
      CustomerMock.verify();
      CustomerMock.restore();
      expect(result.status).toBe(true);
    });
  });
});
