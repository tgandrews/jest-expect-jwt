/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R, T> {
    toBeTokenContaining(expected: object): R;
    toBeTokenExpiringIn(expiresIn: string): R;
    toBeTokenMatching(expect: object): R;
  }
}
