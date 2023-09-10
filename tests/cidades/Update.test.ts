import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Update city", () => {
  it("should update a Cidade", async () => {
    const res = await testServer.post("/cidades").send({ nome: "São Paulo" });
    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer.put(`/cidades/${res.body}`).send({
      nome: "Rio de Janeiro",
    });
    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
});
