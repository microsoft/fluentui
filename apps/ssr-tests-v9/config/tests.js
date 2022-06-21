/** Jest test setup file. */

// Clean up created files/folders on exit, even after exceptions
// (will not catch SIGINT on windows)
const tmp = require('tmp');
tmp.setGracefulCleanup();
