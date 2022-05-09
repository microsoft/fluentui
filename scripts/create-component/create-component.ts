// Plop script for templating out a converged React component
//#region Imports
import { NodePlopAPI, AddManyActionConfig } from 'plop';
import { Actions } from 'node-plop';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import { execSync } from 'child_process';
import { findGitRoot, getAllPackageInfo, isConvergedPackage } from '../monorepo/index';
import chalk from 'chalk';
import { names, WorkspaceJsonConfiguration } from '@nrwl/devkit';

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
}

interface Data extends Answers {
  /** Package name without scope */
  packageName: string;
  /** Absolute path to package */
  packagePath: string;
  /** Absolute path to the component folder */
  componentPath: string;
  /** Different strings Dictionary based off the provided `componentName` */
  componentNames: ReturnType<typeof names>;
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
    ],

    actions: (answers: Answers): Actions => {
      const globOptions: AddManyActionConfig['globOptions'] = { dot: true };
      const packageMetadata = getProjectMetadata({ root, name: answers.packageNpmName });

      const packageName = answers.packageNpmName.replace('@fluentui/', '');
      const componentPath = path.join(packageMetadata.sourceRoot, 'components', answers.componentName);
      const componentNames = names(answers.componentName);
      const data: Data = {
        ...answers,
        packageName,
        packagePath: packageMetadata.root,
        componentPath,
        componentNames,
      };

      return [
        () => checkIfComponentAlreadyExists(data),
        {
          // Copy component templates
          type: 'addMany',
          destination: data.packagePath,
          globOptions,
          data,
          skipIfExists: true,
          templateFiles: ['plop-templates/**/*'],
        },
        () => appendToPackageIndex(data),
        () => {
          console.log(`${chalk.green('✔')} Component files created!`);

          console.log('👷‍♀️ Updating API and running tests...\n');

          execSync(`yarn nx workspace-generator migrate-converged-pkg --name=${data.packageNpmName}`, {
            cwd: root,
            stdio: 'inherit',
          });

          execSync(`yarn workspace ${data.packageNpmName} build:local`, {
            cwd: root,
            stdio: 'inherit',
          });

          execSync(`yarn workspace ${data.packageNpmName} test -t ${data.componentName}`, {
            cwd: root,
            stdio: 'inherit',
          });

          return 'Component ready!';
        },
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

function getProjectMetadata(options: { root: string; name: string }) {
  const nxWorkspace: WorkspaceJsonConfiguration = JSON.parse(
    fs.readFileSync(path.join(options.root, 'workspace.json'), 'utf-8'),
  );

  return nxWorkspace.projects[options.name];
}
