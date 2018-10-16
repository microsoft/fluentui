// Dependencies
const mustache = require('mustache');
const argv = require('yargs').argv;
const fs = require('fs');
const exec = require('./exec-sync');

// Arguments
const newPackageName = argv.name;
const generate = argv.generate === undefined;

// Convert any package names given in dash-case (e.g. my-new-package) to PascalCase (e.g. MyNewPackage)
// for display purposes in certain template files (e.g. README.md)
let pascalCasePackage = newPackageName.replace(/-[a-zA-Z]/g, function(m, t) {
  return newPackageName[t + 1].toUpperCase();
});
pascalCasePackage = pascalCasePackage.substring(0, 1).toUpperCase() + pascalCasePackage.substring(1);

// Current date used in CHANGELOG.md
const today = new Date().toUTCString();

// Paths
const packagePath = `./packages/${newPackageName}`;
const templateFolderPath = './scripts/templates/';
const rushPath = __dirname + '/../rush.json';

// rush.json contents
let rushJson = require(rushPath);

// Output Files
const outputFiles = {
  NpmIgnore: `${packagePath}/.npmignore`,
  Npmrc: `${packagePath}/.npmrc`,
  ChangelogJson: `${packagePath}/CHANGELOG.json`,
  ChangelogMarkdown: `${packagePath}/CHANGELOG.md`,
  License: `${packagePath}/LICENSE`,
  Readme: `${packagePath}/README.md`,
  IndexHtml: `${packagePath}/index.html`,
  JestConfig: `${packagePath}/jest.config.js`,
  JsConfig: `${packagePath}/jsconfig.json`,
  PackageJson: `${packagePath}/package.json`,
  TsConfig: `${packagePath}/tsconfig.json`,
  TsLint: `${packagePath}/tslint.json`,
  WebpackConfig: `${packagePath}/webpack.config.js`,
  WebpackServeConfig: `${packagePath}/webpack.serve.config.js`,
  VsCodeLaunch: `${packagePath}/.vscode/launch.json`,
  VsCodeSettings: `${packagePath}/.vscode/settings.json`,
  Tests: `${packagePath}/config/tests.js`,
  ApiExtractorDisabled: `${packagePath}/config/api-extractor.json.disabled`,
  TestsCommon: `${packagePath}/src/common/tests.js`,
  AppDefinition: `${packagePath}/src/demo/AppDefinition.tsx`,
  ColorStyles: `${packagePath}/src/demo/ColorStyles.scss`,
  GettingStartedPageStyles: `${packagePath}/src/demo/GettingStartedPage.scss`,
  GettingStartedPage: `${packagePath}/src/demo/GettingStartedPage.tsx`,
  DemoStyles: `${packagePath}/src/demo/index.scss`,
  Demo: `${packagePath}/src/demo/index.tsx`
};

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
  if (stepIndex >= Object.keys(outputFiles).length) {
    updateRush();
    return;
  }

  const step = Object.keys(outputFiles)[stepIndex];
  const mustacheTemplateName = `Empty${step}.mustache`;

  console.log('Creating ' + outputFiles[step] + '...');

  fs.readFile(`${templateFolderPath}${mustacheTemplateName}`, 'utf8', (error, data) => {
    readFileCallback(
      error,
      data,
      outputFiles[step],
      () => performStep(stepIndex + 1),
      errorUnableToOpenTemplate(mustacheTemplateName),
      errorUnableToWriteFile(step)
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
    versionPolicyName: 'lockedMajor',
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
