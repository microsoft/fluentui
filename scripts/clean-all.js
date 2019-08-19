// @ts-check

const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
// This script MUST NOT have any deps aside from Node built-ins, because it deletes all node_modules!

/** @returns {Promise<string>} */
function prompt(question) {
  return new Promise(resolve => {
    process.stdin.resume();
    process.stdout.write(question);

    process.stdin.once('data', data => {
      resolve(data.toString().trim());
      process.stdin.pause();
    });
  });
}

function deleteIfSymlink(itemPath) {
  itemPath = path.resolve(itemPath);
  try {
    // Compare realpath since fs.statSync(itemPath).isSymbolicLink() doesn't work on Windows
    if (fs.realpathSync(itemPath) !== itemPath) {
      console.log('  Deleting symlink: ' + itemPath);
      fs.unlinkSync(itemPath);
    }
  } catch (ex) {
    console.warn(`Error running stat or unlink on ${itemPath}: ${ex}`);
  }
}

function deleteNodeModulesSymlinks(nodeModulesPath) {
  if (!fs.existsSync(nodeModulesPath)) {
    return;
  }
  // Check node_modules for symlinks and manually remove those
  const modules = fs.readdirSync(nodeModulesPath);
  for (const mod of modules) {
    const modulePath = path.join(nodeModulesPath, mod);
    if (mod[0] === '@' && !/[/\\]/.test(mod)) {
      // Add any scoped modules to the list of things to check
      modules.push(...fs.readdirSync(modulePath).map(m => path.join(mod, m)));
    } else {
      deleteIfSymlink(modulePath);
    }
  }
}

function deleteSymlinks(parentFolder) {
  const parentPath = path.join(process.cwd(), parentFolder);
  if (!fs.existsSync(parentPath)) {
    return;
  }
  for (const child of fs.readdirSync(parentPath)) {
    const nodeModulesPath = path.join(parentPath, child, 'node_modules');
    deleteNodeModulesSymlinks(nodeModulesPath);
  }
}

async function run() {
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.error('Please run this script from the root of the Git repo');
    process.exit(1);
  }

  const gitStatus = child_process
    .execSync('git status --porcelain')
    .toString()
    .trim();

  if (!process.argv.includes('-y')) {
    console.log('WARNING: This command will PERMANENTLY DELETE all untracked files (such as build output and node_modules).');
    if (gitStatus) {
      console.log('It will also revert uncommitted changes to the following files:');
      const lines = gitStatus.split(/\r?\n/g).map(line => '  ' + line);
      console.log(lines.slice(0, 20).join(os.EOL));
      if (lines.length > 20) {
        console.log(`  ...and ${lines.length - 20} more`);
      }
    }
    const answer = await prompt('Are you sure you want to proceed? (yes/no) ');
    if (answer.toLowerCase()[0] !== 'y') {
      return;
    }
  }

  console.log("Deleting symlinks from packages' node_modules...");
  deleteSymlinks('apps');
  deleteSymlinks('packages');

  console.log('Deleting symlinks from rush temp files...');
  deleteNodeModulesSymlinks('common/temp/node_modules');
  deleteIfSymlink('common/temp/pnpm-local');

  console.log();

  console.log('Running "git clean -fdx" to remove all untracked files/folders (this may take awhile)...');
  child_process.execSync('git clean -fdx');
  console.log('Done!');
}

run().catch(ex => {
  console.error('Caught error:');
  console.error(ex);
  process.exit(1);
});
