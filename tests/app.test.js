const expect  = require("expect");
const request = require("supertest");
const app     = require("../app");

// Add dymmy cars here

describe("GET /", () => {

  it("should get /", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .expect((res) => {
      console.log(res.body);
        //expect(res.body.todos.length).toBe(1);
      })
      .end(done)
  });

});

describe("POST /users/in", () => {

  const json = [
    {
      "email": "test1@test.com",
      "password": 1
    }
  ];

  it("should return email and password", (done) => {
    request(app)
      .post("/users/in")
      .send(json[0])
      .expect(200)
      .expect((res) => {
        //console.log(res.body);
        let data = res.body.data;
        expect(data.email).toBe(json[0].email);
        expect(data.email).toBeA("string");
        expect(data.password).toBe(json[0].password);
        expect(data.password).toBeA("number");

      })
      .end(done)
  });

});