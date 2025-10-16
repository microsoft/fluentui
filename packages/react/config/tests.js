/** Jest test setup file. */

require('@testing-library/jest-dom');

const { TextEncoder, TextDecoder } = require('node:util');

const { initializeIcons } = require('@fluentui/font-icons-mdl2');

Object.assign(global, { TextDecoder, TextEncoder });

// Initialize icons.
initializeIcons('');
