import jwt from "jsonwebtoken";
import ms from "ms";

export default function toBeTokenExpiringIn(
  this: jest.MatcherContext,
  received: any,
  expectedExpiry: string
): jest.CustomMatcherResult {
  if (typeof received !== "string") {
    return {
      pass: false,
      message: () =>
        `Received a ${this.utils.printExpected(
          "string"
        )} token but found a ${this.utils.printReceived(typeof received)}`
    };
  }

  const decoded = jwt.decode(received);
  if (decoded === null) {
    return {
      pass: false,
      message: () =>
        `Was unable to decode the token received: ${this.utils.printReceived(
          received
        )}`
    };
  }

  if (typeof decoded === "string") {
    return {
      pass: false,
      message: () =>
        `Decoded token was a a ${this.utils.printReceived(
          "string"
        )} token but found a ${this.utils.printExpected("object")}`
    };
  }

  const { exp } = decoded;
  const expiringTime = Math.floor((Date.now() + ms(expectedExpiry)) / 1000);

  const pass = exp === expiringTime || exp === expiringTime - 1;
  return {
    pass,
    message: () =>
      `Expected: ${this.utils.printExpected(expiringTime)}
Received (decoded): ${this.utils.printReceived(exp)}`
  };
}
