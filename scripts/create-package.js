// @ts-check

const mustache = require('mustache');
const argv = require('yargs').argv;
const fs = require('fs');
const { spawnSync } = require('child_process');
const findGitRoot = require('./monorepo/findGitRoot');
const path = require('path');

// The package name can be given as a named or positional argument
const newPackageName = /** @type {string} */ (argv.name || argv._[0]);
const newPackageNpmName = '@uifabric/' + newPackageName;

if (!newPackageName) {
  console.error('Please specify a name for the new package.');
  process.exit(1);
}

// Convert any package names given in dash-case (e.g. my-new-package) to PascalCase (e.g. MyNewPackage)
// for display purposes in certain template files (e.g. README.md)
let pascalCasePackage = newPackageName.replace(/-[a-zA-Z]/g, function(match, index) {
  return newPackageName[index + 1].toUpperCase();
});
pascalCasePackage = pascalCasePackage[0].toUpperCase() + pascalCasePackage.substring(1);

// Current date used in CHANGELOG.md
const today = new Date().toUTCString();

// Paths
const packagePath = path.join(process.cwd(), 'packages', newPackageName);
const templateFolderPath = path.join(process.cwd(), 'scripts', 'templates', 'create-package');
if (fs.existsSync(packagePath)) {
  console.error(`New package path ${packagePath} already exists.`);
  process.exit(1);
}

// @uifabric/experiments package.json contents
// (current dependency versions are copied from here to avoid causing issues with yarn checkchange)
const experimentsPackagePath = path.join(process.cwd(), 'packages/experiments/package.json');
if (!fs.existsSync(experimentsPackagePath)) {
  console.error('Could not find @uifabric/experiments package.json (needed to get current dependency versions)');
  process.exit(1);
}
const experimentsPackageJson = JSON.parse(fs.readFileSync(experimentsPackagePath, 'utf8'));

// Steps (mustache template names and output file paths)
const steps = [
  { template: 'NpmIgnore', output: '.npmignore' },
  { template: 'Npmrc', output: '.npmrc' },
  { template: 'ChangelogJson', output: 'CHANGELOG.json' },
  { template: 'ChangelogMarkdown', output: 'CHANGELOG.md' },
  { template: 'License', output: 'LICENSE' },
  { template: 'Readme', output: 'README.md' },
  { template: 'JustConfig', output: 'just.config.js' },
  { template: 'JestConfig', output: 'jest.config.js' },
  { template: 'JsConfig', output: 'jsconfig.json' },
  { template: 'PackageJson', output: 'package.json' },
  { template: 'PrettierConfig', output: 'prettier.config.js' },
  { template: 'TsConfig', output: 'tsconfig.json' },
  { template: 'TsLint', output: 'tslint.json' },
  { template: 'WebpackConfig', output: 'webpack.config.js' },
  { template: 'WebpackServeConfig', output: 'webpack.serve.config.js' },
  { template: 'Tests', output: path.join('config', 'tests.js') },
  { template: 'PreCopy', output: path.join('config', 'pre-copy.json') },
  { template: 'IndexTs', output: path.join('src', 'index.ts') },
  { template: 'Version', output: path.join('src', 'version.ts') },
  { template: 'AppDefinition', output: path.join('src', 'demo', 'AppDefinition.tsx') },
  { template: 'GettingStartedPage', output: path.join('src', 'demo', 'GettingStartedPage.tsx') },
  { template: 'Demo', output: path.join('src', 'demo', 'index.tsx') }
];

// Strings
const successCreatedPackage = `New package ${newPackageName} successfully created.`;
const yarnMessage = 'Running "yarn"';
const errorUnableToCreatePackage = `Error creating package directory ${packagePath}`;
const errorUnableToOpenTemplate = templateFile => `Unable to open mustache template ${templateFile} for component`;
const errorUnableToWriteFile = step => `Unable to write ${step} file`;

// Functions
function handleError(error, errorPrependMessage) {
  if (error) {
    console.error(errorPrependMessage, error);
    return false;
  }

  return true;
}

function performStep(stepIndex) {
  if (stepIndex >= steps.length) {
    yarnInstall();
    console.log(successCreatedPackage);
    return;
  }

  const step = steps[stepIndex];

  const mustacheTemplateName = `Empty${step.template}.mustache`;

  console.log('Creating ' + step.output + '...');

  fs.readFile(path.join(templateFolderPath, mustacheTemplateName), 'utf8', (error, data) => {
    readFileCallback(
      error,
      data,
      mustacheTemplateName,
      path.join(packagePath, step.output),
      () => performStep(stepIndex + 1),
      errorUnableToOpenTemplate(mustacheTemplateName),
      errorUnableToWriteFile(step.output)
    );
  });
}

function yarnInstall() {
  console.log(yarnMessage);
  const yarnResult = spawnSync('yarn', ['--ignore-scripts'], { cwd: findGitRoot(), stdio: 'inherit' });
  if (yarnResult.status !== 0) {
    console.error('Something went wrong with running yarn. Please check previous logs for details');
    process.exit(1);
  }
}

function readFileCallback(error, data, templateName, outputFilePath, callback, readFileError, writeFileError) {
  if (!handleError(error, readFileError)) {
    return;
  }

  // Keys of this object are Mustache "tag" keys: a tag like {{packageName}} in the template
  // will be replaced with view.packageName.
  const view = {
    packageName: newPackageName,
    packageNpmName: newPackageNpmName,
    friendlyPackageName: pascalCasePackage,
    todayDate: today
  };
  if (templateName.toLowerCase().indexOf('packagejson') !== -1) {
    // The package.json template has an additional tag for the version of each dependency.
    // This is preferable over hardcoding dependency versions to prevent errors with dependency consistency.
    // As of writing, @uifabric/experiments also depends on all the packages the template needs,
    // so we grab the current versions from there and add tags for them in the view object.
    const templatePackageJson = JSON.parse(data);
    const deps = { ...templatePackageJson.devDependencies, ...templatePackageJson.dependencies };
    const depVersions = { ...experimentsPackageJson.devDependencies, ...experimentsPackageJson.dependencies };
    const packages = Object.keys(deps);
    for (const package of packages) {
      if (depVersions[package]) {
        // The package versions use triple braced tags to prevent Mustache from HTML encoding the text
        const tagName = deps[package].replace('{{{', '').replace('}}}', '');
        view[tagName] = depVersions[package];
      } else {
        console.warn(`Could not determine appropriate version of ${package} from @uifabric/experiments package.json`);
      }
    }
    view.typesReactPeerDep = experimentsPackageJson.peerDependencies['@types/react'];
    view.typesReactDomPeerDep = experimentsPackageJson.peerDependencies['@types/react-dom'];
    view.reactPeerDep = experimentsPackageJson.peerDependencies.react;
    view.reactDomPeerDep = experimentsPackageJson.peerDependencies['react-dom'];
  }

  const fileData = mustache.render(data, view);
  fs.writeFile(outputFilePath, fileData, error => {
    writeFileCallback(error, writeFileError, callback);
  });
}

function writeFileCallback(error, writeFileError, callback) {
  if (!handleError(error, writeFileError)) {
    return;
  }

  if (callback) {
    callback();
  }
}

function makePackage(error) {
  if (!handleError(error, errorUnableToCreatePackage)) {
    return;
  }

  fs.mkdirSync(`${packagePath}/config`);
  fs.mkdirSync(`${packagePath}/src`);
  fs.mkdirSync(`${packagePath}/src/demo`);
  fs.mkdirSync(`${packagePath}/src/components`);

  performStep(0);
}

if (newPackageName) {
  // Create new folder for package
  fs.mkdir(packagePath, makePackage);
} else {
  console.error('Please provide a package name');
}
