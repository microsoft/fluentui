// Plop script for templating out a converged React component
//#region Imports
import { execSync } from 'child_process';
import * as os from 'os';
import * as path from 'path';

import { findGitRoot, getAllPackageInfo, isConvergedPackage } from '@fluentui/scripts-monorepo';
import { ProjectsConfigurations, names } from '@nrwl/devkit';
import chalk from 'chalk';
import * as fs from 'fs-extra';
import { Actions } from 'node-plop';
import { AddManyActionConfig, NodePlopAPI } from 'plop';

//#endregion

//#region Globals
const convergedComponentPackages = Object.entries(getAllPackageInfo())
  .filter(
    ([pkgName, info]) =>
      isConvergedPackage({ packagePathOrJson: info.packageJson }) &&
      pkgName.startsWith('@fluentui/react-') &&
      info.packagePath.startsWith('packages') &&
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
      if (!packageMetadata.sourceRoot) {
        throw new Error(`${answers.packageNpmName} has is missing sourceRoot path in workspace.json`);
      }

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

          execSync(`yarn workspace ${data.packageNpmName} generate-api`, {
            cwd: root,
            stdio: 'inherit',
          });

          execSync(`yarn workspace ${data.packageNpmName} test -t ${data.componentName}`, {
            cwd: root,
            stdio: 'inherit',
          });

          execSync(`yarn workspace ${data.packageNpmName} lint --fix`, {
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

  const indexPath = path.join(packagePath, 'src/index.ts');
  const indexContent = cleanCreatePackageTemplate(indexPath);

  const appendLine = `export * from './${componentName}';`;

  // read contents and see if line is exists
  if (!indexContent.includes(appendLine)) {
    // doesn't exist so append
    fs.writeFileSync(indexPath, `${appendLine}${os.EOL}`, { flag: 'a' });
    return `Updated package ${packageName} index.ts to include ${componentName}`;
  }

  return `Package ${packageName} index.ts already contains reference to ${componentName}`;

  function cleanCreatePackageTemplate(filePath: string) {
    const content = fs.readFileSync(filePath, { encoding: 'utf8' });
    const templateContent = 'export {}';

    if (content.indexOf(templateContent) !== -1) {
      fs.writeFileSync(filePath, '');
      return '';
    }
    return content;
  }
};

//#endregion

function getProjectMetadata(options: { root: string; name: string }) {
  const nxWorkspace: ProjectsConfigurations = JSON.parse(
    fs.readFileSync(path.join(options.root, 'workspace.json'), 'utf-8'),
  );

  return nxWorkspace.projects[options.name];
}
