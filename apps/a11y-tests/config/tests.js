/** Jest test setup file. */
const path = require('path');
const mkdirp = require('mkdirp');

// Initialize icons
const { initializeIcons } = require('@uifabric/icons');
initializeIcons();

// Create `dist/reports` folder to save SARIF reports
mkdirp.sync(path.resolve(__dirname, '../dist/reports'));

// Mock Date class
// Note: In order to ensure that test output is consistent, locale-specific time is used instead of UTC.
//       As Fabric controls (DatePicker, Calendar, etc) display local date and time.
const RealDate = Date;
const constantDate = new Date(2017, 0, 6, 4, 41, 20);

global.Date = class {
  static now() {
    return new RealDate(constantDate);
  }

  constructor() {
    return new RealDate(constantDate);
  }
};

// Use locale string instead of UTC string to ensure consistent display.
const mockToLocaleString = () => {
  return constantDate.toLocaleString();
};

global.Date.prototype.toLocaleString = mockToLocaleString;
global.Date.prototype.toLocaleTimeString = mockToLocaleString;
global.Date.prototype.toLocaleDateString = mockToLocaleString;
