const fs = require('fs');
const path = require('path');

function findGitRoot() {
  let cwd = process.cwd();
  const root = path.parse(cwd).root;
  let found = false;
  while (!found && cwd !== root) {
    if (fs.existsSync(path.join(cwd, '.git'))) {
      found = true;
      break;
    }

    cwd = path.dirname(cwd);
  }

  return cwd;
}

module.exports = findGitRoot;
