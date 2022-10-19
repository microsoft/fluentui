import * as os from 'os';

type GetBrowsers = () => string[];

const getBrowsers: GetBrowsers = () => {
  // https://github.com/Polymer/tachometer#webdriver-plugins
  const browsers = ['chrome', 'firefox'];

  if (os.type() === 'Darwin') {
    browsers.push('safari');
  } else if (os.type() === 'Windows_NT') {
    browsers.push('edge');
  }

  return browsers;
};

export { getBrowsers };
