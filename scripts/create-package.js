// Dependencies
const mustache = require('mustache');
const argv = require('yargs').argv;
const fs = require('fs');
const exec = require('./exec-sync');
const path = require('path');

// Arguments
const newPackageName = argv.name;
const generate = argv.generate === undefined;

// Convert any package names given in dash-case (e.g. my-new-package) to PascalCase (e.g. MyNewPackage)
// for display purposes in certain template files (e.g. README.md)
let pascalCasePackage = '';
if (newPackageName) {
  pascalCasePackage = newPackageName.replace(/-[a-zA-Z]/g, function(match, index) {
    return newPackageName[index + 1].toUpperCase();
  });
  pascalCasePackage = pascalCasePackage.substring(0, 1).toUpperCase() + pascalCasePackage.substring(1);
}

// Current date used in CHANGELOG.md
const today = new Date().toUTCString();

// Paths
const packagePath = path.join(process.cwd(), 'packages', newPackageName);
const templateFolderPath = path.join(process.cwd(), 'scripts', 'templates');
const rushPath = path.join(__dirname, '..', 'rush.json');

// rush.json contents
let rushJson = require(rushPath);

// Steps (mustache template names and output file paths)
const steps = [
  { template: 'NpmIgnore', output: '.npmignore' },
  { template: 'Npmrc', output: '.npmrc' },
  { template: 'ChangelogJson', output: 'CHANGELOG.json' },
  { template: 'ChangelogMarkdown', output: 'CHANGELOG.md' },
  { template: 'License', output: 'LICENSE' },
  { template: 'Readme', output: 'README.md' },
  { template: 'IndexHtml', output: 'index.html' },
  { template: 'JestConfig', output: 'jest.config.js' },
  { template: 'JsConfig', output: 'jsconfig.json' },
  { template: 'PackageJson', output: 'package.json' },
  { template: 'TsConfig', output: 'tsconfig.json' },
  { template: 'TsLint', output: 'tslint.json' },
  { template: 'WebpackConfig', output: 'webpack.config.js' },
  { template: 'WebpackServeConfig', output: 'webpack.serve.config.js' },
  { template: 'VsCodeLaunch', output: path.join('.vscode', 'launch.json') },
  { template: 'Tests', output: path.join('config', 'tests.js') },
  { template: 'Tests', output: path.join('src', 'common', 'tests.js') },
  { template: 'IndexTs', output: path.join('src', 'index.ts') },
  { template: 'Version', output: path.join('src', 'version.ts') },
  { template: 'AppDefinition', output: path.join('src', 'demo', 'AppDefinition.tsx') },
  { template: 'ColorStyles', output: path.join('src', 'demo', 'ColorStyles.scss') },
  { template: 'GettingStartedPageStyles', output: path.join('src', 'demo', 'GettingStartedPage.scss') },
  { template: 'GettingStartedPage', output: path.join('src', 'demo', 'GettingStartedPage.tsx') },
  { template: 'DemoStyles', output: path.join('src', 'demo', 'index.scss') },
  { template: 'Demo', output: path.join('src', 'demo', 'index.tsx') }
];

// Strings
const successCreatedPackage = `New package ${newPackageName} successfully created.`;
const npmGenerateMessage = 'Running "npm generate" (to bypass this step, use --no-generate arg)';
const rushPackagePresent = `Package @uifabric/${newPackageName} is already present in rush.json`;
const errorUnableToCreatePackage = `Error creating package directory ${packagePath}`;
const errorUnableToOpenTemplate = templateFile => `Unable to open mustache template ${templateFile} for component`;
const errorUnableToWriteFile = step => `Unable to write ${step} file`;
const errorUnableToUpdateRush = 'Unable to update rush.json';

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
    updateRush();
    return;
  }

  const step = steps[stepIndex];

  const mustacheTemplateName = `Empty${step.template}.mustache`;

  console.log('Creating ' + step.output + '...');

  fs.readFile(path.join(templateFolderPath, mustacheTemplateName), 'utf8', (error, data) => {
    readFileCallback(
      error,
      data,
      path.join(packagePath, step.output),
      () => performStep(stepIndex + 1),
      errorUnableToOpenTemplate(mustacheTemplateName),
      errorUnableToWriteFile(step.output)
    );
  });
}

function readFileCallback(error, data, outputFilePath, callback, readFileError, writeFileError) {
  if (!handleError(error, readFileError)) {
    return;
  }

  const fileData = mustache.render(data, { packageName: newPackageName, friendlyPackageName: pascalCasePackage, todayDate: today });
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

function updateRush() {
  // don't add the same package to rush.json twice
  if (rushContainsPackage()) {
    console.log(rushPackagePresent);
    postRushUpdate();
    return;
  }

  rushJson.projects.push({
    packageName: `@uifabric/${newPackageName}`,
    projectFolder: `packages/${newPackageName}`,
    // versionPolicyName: 'lockedMajor',
    shouldPublish: false
  });

  fs.writeFile(rushPath, JSON.stringify(rushJson, null, 2), error => {
    if (!handleError(error, errorUnableToUpdateRush)) {
      return;
    }

    postRushUpdate();
  });
}

function rushContainsPackage() {
  for (let i = 0; i < rushJson.projects.length; i++) {
    if (rushJson.projects[i].packageName === `@uifabric/${newPackageName}`) {
      return true;
    }
  }
  return false;
}

function postRushUpdate() {
  console.log(successCreatedPackage);

  if (generate) {
    console.log(npmGenerateMessage);
    exec('npm run generate');
  }
}

function makePackage(error) {
  if (!handleError(error, errorUnableToCreatePackage)) {
    return;
  }

  fs.mkdirSync(`${packagePath}/.vscode`);
  fs.mkdirSync(`${packagePath}/config`);
  fs.mkdirSync(`${packagePath}/src`);
  fs.mkdirSync(`${packagePath}/src/common`);
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
