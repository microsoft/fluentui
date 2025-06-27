/** Jest test setup file. */
const { TextEncoder, TextDecoder } = require('node:util');
require('@testing-library/jest-dom');

Object.assign(global, { TextDecoder, TextEncoder });

const { initializeIcons } = require('@fluentui/font-icons-mdl2');
// Initialize icons.
initializeIcons('');
