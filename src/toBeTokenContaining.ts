import buildJWTContentMatcher from "./util/buildJWTContentMatcher";

const toBeTokenContaining = buildJWTContentMatcher(function(
  this: jest.MatcherContext,
  received: Record<string, any>,
  expected: Record<string, any>
) {
  return this.equals(received, expect.objectContaining(expected));
});

export default toBeTokenContaining;
