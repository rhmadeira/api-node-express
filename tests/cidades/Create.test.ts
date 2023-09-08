import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Create city", () => {
  it("should create a new Cidade", async () => {
    const res = await testServer.post("/cidades").send({ nome: "São Paulo" });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("try creating a register with a short name", async () => {
    const res = await testServer.post("/cidades").send({ nome: "SP" });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });
});
