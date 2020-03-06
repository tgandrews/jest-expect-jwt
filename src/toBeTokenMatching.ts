import buildJWTContentMatcher from "./util/buildJWTContentMatcher";

const toBeTokenMatching = buildJWTContentMatcher(function(
  this: jest.MatcherContext,
  received: Record<string, any>,
  expected: Record<string, any>
) {
  return this.equals(received, expected);
});

export default toBeTokenMatching;
