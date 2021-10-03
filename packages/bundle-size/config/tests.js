const tmp = require('tmp');

// Clean up created files/folders on exit, even after exceptions
// (will not catch SIGINT on windows)
tmp.setGracefulCleanup();
