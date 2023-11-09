const fs = require('fs');

const tearDownTests = async () => {
  fs.unlink('src/components/Sparkline/SparklineBase.js', err => {});
};

module.exports = tearDownTests;
