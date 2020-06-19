const supertest = require("supertest");

const server = require("./server.js");
const db = require("../database/dbConfig.js");

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






    //test that the user login is not undefined

    //it('POST /api/auth/login', () => {
    //    return supertest(server)
    //        .post('/api/auth/login')
    //        .send({ username: 'john', password: '123' })
    //        .then(res => {
    //            expect(res.body.token).not.toBeUndefined()
    //        })
    //})
    









});