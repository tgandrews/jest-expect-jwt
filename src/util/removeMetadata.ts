const removeMetadata = (token: Record<string, any>) => {
  const { iat: _iat, exp: _exp, ...cleaned } = token;
  return cleaned;
};

export default removeMetadata;
