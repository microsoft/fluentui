const tsNode = require('ts-node');

tsNode.register({
  // https://github.com/TypeStrong/ts-node#skipproject - don't read tsconfig within ts-node
  skipProject: true,

  // @deprecated: we cannot use this until new version of ts-node is released https://github.com/TypeStrong/ts-node/pull/2062
  // swc: true,
  // remove this once `swc` will start working again
  transpileOnly: true,
});
