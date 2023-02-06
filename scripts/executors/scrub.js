// eslint-disable-next-line @typescript-eslint/naming-convention, camelcase
const child_process = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
// This script MUST NOT have any deps aside from Node built-ins, because it deletes all node_modules!

const verbose = process.argv.includes('--verbose') || process.argv.includes('-v');

/**
 * @param {string} question - question to ask the user
 * @returns {Promise<string>} response
 */
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

/**
 * @param {string} itemPath
 * @param {string[]} failedPaths
 */
function deleteIfSymlink(itemPath, failedPaths) {
  try {
    // Compare realpath since fs.statSync(itemPath).isSymbolicLink() doesn't work on Windows
    if (fs.existsSync(itemPath) && fs.realpathSync(itemPath) !== itemPath) {
      if (verbose) {
        console.log('  Deleting symlink: ' + itemPath);
      }
      fs.unlinkSync(itemPath);
    }
  } catch (ex) {
    console.warn(`Error running realpath or unlink on ${itemPath}: ${ex}`);
    failedPaths.push(itemPath);
  }
}

/**
 * Delete symlinks from a package's node_modules folder
 * @param {string} packagePath
 * @param {string[]} failedPaths
 */
function deleteNodeModulesSymlinks(packagePath, failedPaths) {
  const nodeModulesPath = path.resolve(packagePath, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    return;
  }
  // Check node_modules for symlinks and manually remove those
  // (using this odd way of iterating since we're adding more modules to the list as we go)
  const modules = fs.readdirSync(nodeModulesPath);
  /** @type {string} */
  let mod;
  while ((mod = /** @type {string} */ (modules.pop()))) {
    const modulePath = path.join(nodeModulesPath, mod);
    if (mod[0] === '@' && !/[/\\]/.test(mod)) {
      // Add any scoped modules to the list of things to check
      modules.push(...fs.readdirSync(modulePath).map(m => path.join(mod, m)));
    } else {
      deleteIfSymlink(modulePath, failedPaths);
    }
  }
}

/**
 * @param {string} parentFolder
 */
function getChildren(parentFolder) {
  return fs.readdirSync(parentFolder).map(child => path.join(parentFolder, child));
}

/**
 * @param {string} cmd
 * @param {string[]} args
 */
function spawn(cmd, args) {
  const maxBuffer = 1024 * 1024 * 10; // default is 1024 * 1024
  const result = child_process.spawnSync(cmd, args, { stdio: 'inherit', maxBuffer });
  if (result.error) {
    throw result.error;
  } else if (result.status) {
    throw new Error('Command failed');
  }
}

async function run() {
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.error('Please run this script from the root of the Git repo');
    process.exit(1);
  }

  const gitStatus = child_process.execSync('git status --porcelain').toString().trim();

  if (!process.argv.includes('-y')) {
    console.log(
      'WARNING: This command will PERMANENTLY DELETE all untracked files (such as build output and node_modules).',
    );
    if (gitStatus) {
      console.log('It will also revert uncommitted changes to the following files:');
      const lines = gitStatus.split(/\r?\n/g).map(line => '  ' + line);
      const showFileCount = 20;
      console.log(lines.slice(0, showFileCount).join('\n'));
      if (lines.length > showFileCount) {
        console.log(`  ...and ${lines.length - showFileCount} more`);
      }
    }
    const answer = await prompt('Are you sure you want to proceed? (yes/no) ');
    if (answer.toLowerCase()[0] !== 'y') {
      return;
    }
  }

  // do these before deleting node_nodules
  console.log('\nClearing Jest cache...');
  try {
    spawn(os.platform() === 'win32' ? 'npx.cmd' : 'npx', ['jest', '--clearCache']);
  } catch (err) {
    console.error('Clearing jest cache failed, likely due to it or a dep not being installed.');
  }
  try {
    console.log('\nAttempting to clear gulp-cache...');
    const cache = require('gulp-cache');
    cache.clearAll();
    console.log('...success!');
  } catch (err) {
    console.log('Clearing gulp-cache failed, likely due it not being installed.');
  }

  /**
   * @type {string[]}
   */
  const failedPaths = [];

  console.log("\nDeleting symlinks from packages' node_modules and rush temp files...");
  const folders = [
    '.',
    ...getChildren('apps'),
    ...getChildren('packages'),
    ...getChildren('packages/fluentui'),
    'scripts',
    'common/temp',
  ];
  for (const folder of folders) {
    deleteNodeModulesSymlinks(folder, failedPaths);
  }
  deleteIfSymlink(path.resolve('common/temp/pnpm-local'), failedPaths);

  if (failedPaths.length) {
    console.error('Deleting the following symlinks failed. Please delete these manually and try again.');
    console.error(failedPaths.map(p => '  ' + p).join('\n'));
    process.exit(1);
  }

  console.log('\nRunning "git clean -fdx" to remove all untracked files/folders (this may take awhile)...');
  spawn('git', ['clean', '-fdx']);

  console.log('\nRunning "git reset --hard"...');
  spawn('git', ['reset', '--hard']);

  console.log('\nDone!');
}

run().catch(ex => {
  console.error('Caught error:');
  console.error(ex);
  process.exit(1);
});
