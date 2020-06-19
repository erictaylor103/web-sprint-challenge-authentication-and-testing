const supertest = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

const userDetails = {
    username: "eric",
    password: "123",
  };

  
const createUser = async (userDetails) => {
    return await supertest(server).post("/api/auth/register").send(userDetails);
  }; 
  

it("should user the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
});


describe("server.js", () => {
    beforeEach(async () => {
        await db("users").truncate();
    });

    describe("GET /", () => {
        it("should return 200 OK", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    // jest assertion
                    expect(res.status).toBe(200);
                });
        });

        it("should return api: up", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    // jest assertion
                    expect(res.body.api).toBe("up");
                    expect(res.body).toEqual({ api: "up" });
                });
        });

        it("should return JSON", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    // jest assertion
                    expect(res.type).toMatch(/json/i);
                });
        });
    });


    //test that a user can register

    //test that the user can log in
    it('POST /api/auth/login', async() => {

        await supertest(server)
            .post('/api/auth/register')
            .send({ username: 'eric', password: '123' })
            .then(res => {
                expect(res.status).toBe(201)
            })

        const res = await supertest(server)
            .post('/api/auth/login')
            .send({ username: 'eric', password: '123' })
            expect(res.status).toBe(200)
            //.then(res => {
            //    expect(res.status).toBe(200)
            //})
    })


//check for status 201 when a user is registered
it("It should return status code of 201", () => {
    return supertest(server)
      .post("/api/auth/register")
      .send(userDetails)
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

//check if a token is returned on login
    it("Should return a token", async () => {
        await createUser(userDetails);
    
        const res = await supertest(server)
          .post("/api/auth/login")
          .send(userDetails);
    
        return expect(res.body.token).toBeTruthy();

        

      });

      //check for status 201 when registering a user
      
      
      



});



