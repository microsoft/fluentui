const mustache = require('mustache');
const argv = require('yargs').argv;
const fs = require('fs');
const exec = require('./exec-sync');
const readConfig = require('./read-config');
const writeConfig = require('./write-config');
const path = require('path');

// The package name can be given as a named or positional argument
const newPackageName = argv.name || argv._[0];
const newPackageNpmName = '@uifabric/' + newPackageName;
const generate = argv.generate !== false;

if (!newPackageName) {
  console.error('Please specify a name for the new package.');
  return;
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
  return;
}

// rush.json contents
const rushJson = readConfig('rush.json');
if (!rushJson) {
  console.error('Could not find rush.json.');
  return;
}

// @uifabric/experiments package.json contents
// (current dependency versions are copied from here to avoid causing issues with rush check)
const experimentsPackagePath = path.join(process.cwd(), 'packages/experiments/package.json');
if (!fs.existsSync(experimentsPackagePath)) {
  console.error('Could not find @uifabric/experiments package.json (needed to get current dependency versions)');
  return;
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
const rushPackagePresent = `Package ${newPackageNpmName} is already present in rush.json`;
const errorUnableToCreatePackage = `Error creating package directory ${packagePath}`;
const errorUnableToOpenTemplate = templateFile => `Unable to open mustache template ${templateFile} for component`;
const errorUnableToWriteFile = step => `Unable to write ${step} file`;
const errorUnableToUpdateRush = `Could not add an entry for ${newPackageNpmName} to list of projects in rush.json. You must add this entry manually.`;

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
      mustacheTemplateName,
      path.join(packagePath, step.output),
      () => performStep(stepIndex + 1),
      errorUnableToOpenTemplate(mustacheTemplateName),
      errorUnableToWriteFile(step.output)
    );
  });
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
    // This is preferable over hardcoding dependency versions to prevent errors with rush check.
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

function updateRush() {
  // don't add the same package to rush.json twice
  if (rushJson.projects.some(project => project.packageName === newPackageNpmName)) {
    console.error(rushPackagePresent);
    postRushUpdate();
    return;
  }

  rushJson.projects.push({
    packageName: newPackageNpmName,
    projectFolder: 'packages/' + newPackageName,
    shouldPublish: false
  });
  if (!writeConfig('rush.json', rushJson)) {
    console.error(errorUnableToUpdateRush);
  }
  postRushUpdate();
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
