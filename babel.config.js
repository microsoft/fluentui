module.exports = api => ({
  ...require('@fluentui/scripts-babel')(api),
  babelrcRoots: ['./packages/*'],
});
