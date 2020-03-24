// test: a glob expression to match assets name
// maxSize: the maximum size of the asset
// compression: the compression used to compare the size (by default "none")
module.exports = {
  files: [
    {
      test: '*',
      maxSize: '250 kB',
    },
  ],
}
/*
both uncompressed and gzip
    {
      "test": "*.js",
      "maxSize": "250 kB",
      "compression": "none"
    },
    {
      "test": "*.js",
      "maxSize": "10 kB",
      "compression": "gzip"
    }
  */
