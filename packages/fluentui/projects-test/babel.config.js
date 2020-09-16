module.exports = api => ({
  ...require('@uifabric/build/babel')(api),
  babelrcRoots: ['../../*'],
});
