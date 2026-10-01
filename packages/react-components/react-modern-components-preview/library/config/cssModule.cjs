module.exports = new Proxy(
  {},
  {
    get: (_, property) => property,
  },
);
