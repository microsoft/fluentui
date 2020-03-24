// test: a glob expression to match assets name
// maxSize: the maximum size of the asset
// compression: the compression used to compare the size (by default "none")
module.exports = {
  files: [
    {
      test: 'dist/*',
      maxSize: '100 kB',
      compression: 'none',
    },
    {
      test: 'dist/*',
      maxSize: '10 kB',
      compression: 'gzip',
    },
  ],
};
