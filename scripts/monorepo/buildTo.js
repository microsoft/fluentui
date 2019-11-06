const { spawnSync } = require('child_process');
const lernaBin = require.resolve('lerna/cli.js');
const getAllPackageInfo = require('./getAllPackageInfo');

const argv = process.argv.slice(2);

// Display a usage message when there is no projects specified
if (argv.length < 1) {
  console.log(`Usage:

  yarn buildto [packagename] [--min]

This command builds all packages up to and including "packagename". The package name can actually be a substring.
If multiple packages matched the pattern, they will all be built (along with their dependencies).`);

  process.exit(0);
}

const [project, ...rest] = argv;

// This script matches substrings of the input for one more many projects
const allPackages = getAllPackageInfo();

let foundProjects = [project];

if (!allPackages[project]) {
  foundProjects = Object.keys(allPackages).filter(name => name.includes(project));
  if (foundProjects.length === 0) {
    console.log(`There is no project matching "${project}" in this repo`);
  } else if (foundProjects.length > 1) {
    console.log(`More than one project matched: "${foundProjects.join('", "')}"`);
  } else {
    console.log(`Found a matching project named "${foundProjects[0]}"`);
  }
}

const scopes = [];
foundProjects.forEach(projectName => {
  scopes.push('--scope');
  scopes.push(projectName);
});

// Lerna has many flags, --scope limits build to a specified package while --include-filtered-Dependencies makes the build include dependencies
// --stream allows the build to proceed in parallel but still in order
spawnSync(process.execPath, [lernaBin, 'run', 'build', ...scopes, '--include-filtered-dependencies', '--stream', '--', ...rest], {
  stdio: 'inherit'
});
