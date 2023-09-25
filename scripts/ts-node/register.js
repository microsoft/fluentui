const tsNode = require('ts-node');

tsNode.register({
  // https://github.com/TypeStrong/ts-node#skipproject - don't read tsconfig within ts-node
  skipProject: true,
  swc: true,
});
