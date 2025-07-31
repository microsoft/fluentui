/** Jest test setup file. */

const { TextEncoder, TextDecoder } = require('node:util');

Object.assign(global, { TextDecoder, TextEncoder });
