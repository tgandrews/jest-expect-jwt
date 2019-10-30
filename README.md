# jest-expect-jwt
A nicer way to compare JWT contents in tests

Example:
```js
expect(token).toBeTokenContaining({ hello: 'world' });
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

## Expectations

### `toBeTokenContaining`
It can be used to compare the object encoded within the token excluding the `iat`. 

Example:
```js
expect(token).toBeTokenContaining({ hello: 'world' });
```