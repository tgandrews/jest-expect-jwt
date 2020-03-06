import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const privateKey = fs.readFileSync(path.resolve(__dirname, "../private.pem"), {
  encoding: "utf8"
});

const sign = (expiresIn: string) =>
  jwt.sign({}, privateKey, { algorithm: "RS256", expiresIn });

describe("toBeTokenExpiringIn", () => {
  it("should compare object contents", () => {
    expect(sign("24h")).toBeTokenExpiringIn("24h");
    expect(sign("30 seconds")).not.toBeTokenExpiringIn("1 hour");
  });

  it("should allow for the expiry time to be out by a second earlier", () => {
    expect(sign("0s")).toBeTokenExpiringIn("1s");
    expect(sign("2s")).not.toBeTokenExpiringIn("1s");
  });
});
