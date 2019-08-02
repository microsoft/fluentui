/** Jest test setup file. */
const path = require('path');
const mkdirp = require('mkdirp');

// Initialize icons
const { initializeIcons } = require('@uifabric/icons');
initializeIcons();

// Create `dist/reports` folder to save SARIF reports
mkdirp.sync(path.resolve(__dirname, '../dist/reports'));

// Mock Date class
const RealDate = Date;
const constantDate = new Date(Date.UTC(2017, 0, 6, 4, 41, 20));

global.Date = class {
  static now() {
    return new RealDate(constantDate);
  }

  constructor() {
    return new RealDate(constantDate);
  }
};

// Ensure test output is consistent across machine locale and time zone config.
const mockToLocaleString = () => {
  return constantDate.toUTCString();
};

global.Date.prototype.toLocaleString = mockToLocaleString;
global.Date.prototype.toLocaleTimeString = mockToLocaleString;
global.Date.prototype.toLocaleDateString = mockToLocaleString;
