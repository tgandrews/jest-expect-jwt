# jest-expect-jwt

A nicer way to compare JWT properties in tests

## Expectations

### `toBeTokenContaining`

It can be used to compare the object encoded within the token excluding the `iat`.

Example:

```js
expect(token).toBeTokenContaining({ hello: "world" });
```

### `toBeTokenExpiringIn`

Check when the token is expiring. This gives a couple of seconds leway either side to avoid having
to mock dates. The expiry time can be written in a human readable format by using
[zeit/ms](https://github.com/zeit/ms)

Example:

```js
expect(token).toBeExpiringIn("24h");
```

## Setup

### 1. Install the package

npm

```sh
npm install --save-dev jest-expect-jwt
```

yarn

```sh
yarn add --dev jest-expect-jwt
```

### 2. Configure it within jest

Add it your jest config either `jest.config.js` or `package.json`.

```json
{
  ...
  "setupFilesAfterEnv": ["jest-expect-jwt"],
  ...
}
```
