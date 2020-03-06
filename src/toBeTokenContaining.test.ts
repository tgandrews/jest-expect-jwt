import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const privateKey = fs.readFileSync(path.resolve(__dirname, "../private.pem"), {
  encoding: "utf8"
});

const sign = (contents: object | string, options = {}) =>
  jwt.sign(contents, privateKey, { algorithm: "RS256", ...options });

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

  it("should ignore the expiration setting", () => {
    expect(sign({ hello: "world" }, { expiresIn: "24h" })).toBeTokenContaining({
      hello: "world"
    });
  });

  it("should partially match object", () => {
    expect(sign({ a: 1, b: 2, c: 3 })).toBeTokenContaining({ b: 2 });
    expect(sign({ a: 1, b: 2, c: 3 })).not.toBeTokenContaining({ d: 2 });
  });
});
