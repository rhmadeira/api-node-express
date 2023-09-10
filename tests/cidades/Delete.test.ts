import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Delete city", () => {
  it("should delete a Cidade", async () => {
    const res = await testServer.post("/cidades").send({ nome: "São Paulo" });
    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer.delete(`/cidades/${res.body}`);
    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
});
