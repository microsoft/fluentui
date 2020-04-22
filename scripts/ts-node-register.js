const tsNode = require('ts-node');
const jju = require('jju');
const fs = require('fs');
const path = require('path');

// Until ts-node re-enables caching, we're using version 7 (before caching was disabled).
// https://github.com/TypeStrong/ts-node/issues/951
tsNode.register({
  // Run in transpileOnly mode because with type checking it's very slow
  transpileOnly: true,
  // TODO: re-enable when upgrading ts-node to version which supports this
  // // Register ts-node so that it uses the scripts directory's tsconfig
  // dir: __dirname,
  // Hack to work around lack of `dir` option: manually pass in tsconfig
  compilerOptions: jju.parse(fs.readFileSync(path.join(__dirname, 'tsconfig.json'))).compilerOptions,
  skipProject: true, // don't read tsconfig within ts-node
});
