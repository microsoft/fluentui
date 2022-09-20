const os = require('os');

module.exports.getBrowsers = () => {
  // https://github.com/Polymer/tachometer#webdriver-plugins
  const browsers = ['chrome', 'firefox'];

  if (os.type() === 'Darwin') {
    browsers.push('safari');
  } else if (os.type() === 'Windows_NT') {
    browsers.push('edge');
  }

  return browsers;
};
