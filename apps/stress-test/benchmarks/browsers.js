// const os = require('os');

module.exports.getBrowsers = () => {
  // https://github.com/Polymer/tachometer#webdriver-plugins
  const browsers = ['chrome', 'firefox' /*'edge'*/];

  // if (os.type() === 'Darwin') {
  //     browsers.push('safari');
  // }

  return browsers;
};
