const fs = require('fs');
const path = require('path');

const { workspaceRoot } = require('@nx/devkit');

const topLevelDep = path.join(workspaceRoot, 'node_modules/.just');

if (fs.existsSync(topLevelDep)) {
  fs.rmSync(topLevelDep, { recursive: true });
}
