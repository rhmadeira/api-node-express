import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Get all cities", () => {
  it("should get all Cidades", async () => {
    const res = await testServer.post("/cidades").send({ nome: "São Paulo" });
    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer.get("/cidades").send();
    expect(Number(res2.headers["x-total-count"])).toBeGreaterThan(0);
    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(res2.body.length).toBeGreaterThan(0);
  });
});
