import diff from "jest-diff";
import * as jwt from "jsonwebtoken";

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeTokenContaining(expected: object): R;
    }
  }
}

export default function toBeTokenContaining(
  this: jest.MatcherContext,
  received: any,
  expected: object
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

  const { iat: _, ...withoutIat } = decoded;

  const pass = this.equals(withoutIat, expected);
  return {
    pass,
    message: () => {
      const diffString = diff(expected, withoutIat, {
        expand: this.expand
      });

      if (diffString) {
        return `Difference

${diffString}`;
      }

      return `Expected: ${this.utils.printExpected(expected)}
Received (decoded): ${this.utils.printReceived(decoded)}`;
    }
  };
}
