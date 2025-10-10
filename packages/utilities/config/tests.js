/** Jest test setup file. */

require('@testing-library/jest-dom');

const { TextEncoder, TextDecoder } = require('node:util');

Object.assign(global, { TextDecoder, TextEncoder });
