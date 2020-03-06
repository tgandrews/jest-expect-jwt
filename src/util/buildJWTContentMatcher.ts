import diff from "jest-diff";
import jwt from "jsonwebtoken";

import removeMetadata from "./removeMetadata";

const builtJWTContentMatcher = (comparison: (a: any, b: any) => boolean) =>
  function(
    this: jest.MatcherContext,
    received: any,
    expected: Record<string, any>
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

    const cleanedToken = removeMetadata(decoded);

    const pass = comparison.bind(this)(cleanedToken, expected);
    return {
      pass,
      message: () => {
        const diffString = diff(expected, cleanedToken, {
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
  };

export default builtJWTContentMatcher;
