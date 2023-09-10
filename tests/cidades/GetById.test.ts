import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Get city by id", () => {
  it("should get a Cidade by id", async () => {
    const res = await testServer.post("/cidades").send({ nome: "São Paulo" });
    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer.get(`/cidades/${res.body}`).send();
    expect(res2.statusCode).toEqual(StatusCodes.OK);
  });
});
