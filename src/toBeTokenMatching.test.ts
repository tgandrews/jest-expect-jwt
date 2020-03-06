import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const privateKey = fs.readFileSync(path.resolve(__dirname, "../private.pem"), {
  encoding: "utf8"
});

const sign = (contents: object | string, options = {}) =>
  jwt.sign(contents, privateKey, { algorithm: "RS256", ...options });

describe("toBeTokenMatching", () => {
  it("should compare object contents", () => {
    expect(sign({ hello: "world" })).toBeTokenMatching({ hello: "world" });
    expect(sign({ hello: "foo" })).not.toBeTokenMatching({ hello: "world" });
  });

  it("should compare the objects deeply", () => {
    expect(sign({ a: { b: { c: { d: "e" } } } })).not.toBeTokenMatching({
      a: { b: { c: { d: "f" } } }
    });
    expect(sign({ a: { b: { c: { d: "e" } } } })).toBeTokenMatching({
      a: { b: { c: { d: "e" } } }
    });
  });

  it("should ignore the expiration setting", () => {
    expect(sign({ hello: "world" }, { expiresIn: "24h" })).toBeTokenMatching({
      hello: "world"
    });
  });

  it("should not partially match object", () => {
    expect(sign({ a: 1, b: 2, c: 3 })).toBeTokenMatching({ a: 1, b: 2, c: 3 });
    expect(sign({ a: 1, b: 2, c: 3 })).not.toBeTokenMatching({ a: 1, b: 2 });
  });
});
