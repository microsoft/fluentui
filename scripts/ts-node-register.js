const tsNode = require('ts-node');

tsNode.register({
  transpileOnly: true,
  // https://github.com/TypeStrong/ts-node#cwdmode - consume tsconfig.json within scripts/
  cwd: __dirname,
  // https://github.com/TypeStrong/ts-node#skipproject - don't read tsconfig within ts-node
  skipProject: true,
  swc: true,
});
