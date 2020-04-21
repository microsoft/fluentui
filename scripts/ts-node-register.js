// Register ts-node so that it uses the scripts directory's tsconfig and only transpiles
const tsNode = require('ts-node');
tsNode.register({
  dir: __dirname,
  transpileOnly: true,
});
