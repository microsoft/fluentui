// Plop script for templating out a converged React component
//#region Imports
import { NodePlopAPI, AddManyActionConfig } from 'plop';
import { Actions } from 'node-plop';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import { spawnSync } from 'child_process';
import { findGitRoot, getAllPackageInfo, isConvergedPackage } from '../monorepo/index';
import chalk from 'chalk';

//#endregion

//#region Globals
const convergedComponentPackages = Object.entries(getAllPackageInfo())
  .filter(
    ([pkgName, info]) =>
      isConvergedPackage(info.packageJson) &&
      pkgName.startsWith('@fluentui/react-') &&
      info.packagePath.startsWith('packages') &&
      !!info.packageJson.scripts?.start &&
      !!info.packageJson.dependencies?.['@fluentui/react-utilities'],
  )
  .map(([packageName]) => packageName);

const root = findGitRoot();

interface Answers {
  packageNpmName: string;
  componentName: string;
  doComponentTestBuild?: boolean;
}

interface Data extends Answers {
  /** Package name without scope */
  packageName: string;
  /** Absolute path to package */
  packagePath: string;
  /** Absolute path to the component folder */
  componentPath: string;
}
//#endregion

//#region Module Export
module.exports = (plop: NodePlopAPI) => {
  plop.setWelcomeMessage('This utility is a helper to create converged React components');

  plop.setGenerator('component', {
    description: 'New component',

    prompts: [
      {
        type: 'list',
        name: 'packageNpmName',
        message: 'Which package to create the new component in?',
        choices: convergedComponentPackages,
        validate: (packageName: string) => convergedComponentPackages.includes(packageName),
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'New component name (ex: MyComponent):',
        validate: (input: string) =>
          /^[A-Z][a-zA-Z0-9]+$/.test(input) || 'Must enter a PascalCase component name (ex: MyComponent)',
      },
      {
        type: 'confirm',
        name: 'doComponentTestBuild',
        message: 'Do you wish to run a test build after component creation?',
        default: true,
      },
    ],

    actions: (answers: Answers): Actions => {
      const globOptions: AddManyActionConfig['globOptions'] = { dot: true };

      const packageName = answers.packageNpmName.replace('@fluentui/', '');
      const packagePath = path.join(root, 'packages', packageName);
      const componentPath = path.join(packagePath, 'src/components', answers.componentName);
      const data: Data = {
        ...answers,
        packageName,
        packagePath,
        componentPath,
      };

      return [
        () => checkIfComponentAlreadyExists(data),
        {
          // Copy component templates
          type: 'addMany',
          destination: packagePath,
          globOptions,
          data,
          skipIfExists: true,
          templateFiles: ['plop-templates/**/*'],
        },
        () => appendToPackageIndex(data),
        () => {
          if (!answers.doComponentTestBuild) {
            return 'Skipping component test build';
          }

          console.log('Component files created! Running yarn build...\n');
          const yarnResult = spawnSync('yarn', ['build', '--to', data.packageNpmName], {
            cwd: root,
            stdio: 'inherit',
            shell: true,
          });
          if (yarnResult.status !== 0) {
            throw new Error('Something went wrong with building. Please check previous logs for details.');
          }
          return 'Component compiled!';
        },
        chalk.green.bold(
          'Created new component! Please check over it and ensure wording and included files ' +
            'make sense for your scenario.',
        ),
      ];
    },
  });
};
//#endregion

//#region Custom Actions

const checkIfComponentAlreadyExists = (data: Data): string => {
  const { componentName, componentPath } = data;

  if (fs.existsSync(componentPath) === true && fs.readdirSync(componentPath).length > 0) {
    throw new Error(`The component ${componentName} already exists at ${componentPath}`);
  }
  return `Component ${componentName} doesn't exist yet.`;
};

const appendToPackageIndex = (data: Data): string => {
  const { componentName, packageName, packagePath } = data;

  // get the package index file path
  const indexPath = path.join(packagePath, 'src/index.ts');
  const appendLine = `export * from './${componentName}';`;
  // read contents and see if line is exists
  const contents = fs.readFileSync(indexPath, { encoding: 'utf8' });
  if (!contents.includes(appendLine)) {
    // doesn't exist so append
    fs.writeFileSync(indexPath, `${appendLine}${os.EOL}`, { flag: 'a' });
    return `Updated package ${packageName} index.ts to include ${componentName}`;
  }
  return `Package ${packageName} index.ts already contains reference to ${componentName}`;
};
//#endregion
