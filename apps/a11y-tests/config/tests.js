/** Jest test setup file. */
const path = require('path');
const mkdirp = require('mkdirp');

// Initialize icons
const { initializeIcons } = require('@uifabric/icons');
initializeIcons();

// Create `dist/reports` folder to save SARIF reports
mkdirp.sync(path.resolve(__dirname, '../dist/reports'));
