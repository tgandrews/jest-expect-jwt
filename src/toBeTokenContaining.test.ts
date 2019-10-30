import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

const privateKey = fs.readFileSync(path.resolve(__dirname, "../private.pem"), {
  encoding: "utf8"
});

const sign = (contents: object | string) =>
  jwt.sign(contents, privateKey, { algorithm: "RS256" });

describe("toBeTokenContaining", () => {
  it("should compare object contents", () => {
    expect(sign({ hello: "world" })).toBeTokenContaining({ hello: "world" });
    expect(sign({ hello: "foo" })).not.toBeTokenContaining({ hello: "world" });
  });

  it("should compare the objects deeply", () => {
    expect(sign({ a: { b: { c: { d: "e" } } } })).not.toBeTokenContaining({
      a: { b: { c: { d: "f" } } }
    });
    expect(sign({ a: { b: { c: { d: "e" } } } })).toBeTokenContaining({
      a: { b: { c: { d: "e" } } }
    });
  });
});
