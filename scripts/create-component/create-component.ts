// Plop script for templating out a converged React component
//#region Imports
import { NodePlopAPI, AddManyActionConfig } from 'plop';
import { Actions } from 'node-plop';
import * as fs from 'fs-extra';
import * as os from 'os';
import { spawnSync } from 'child_process';
import { findGitRoot, getAllPackageInfo } from '../monorepo/index';
import stripIndent from 'strip-indent';

//#endregion

//#region Globals
const allPackages = getAllPackageInfo();

const root = findGitRoot();

const rootPaths = {
  package: `packages/{{packageName}}`,
  component: `packages/{{packageName}}/src/components/{{componentName}}`,
  storybook: `packages/react-examples`,
  storybookPackageComponent: `packages/react-examples/src/{{packageName}}/{{componentName}}`,
};

const templatePaths = {
  component: `plop-templates-component`,
  storybookComponent: `plop-templates-storybook`,
  // tests: `${root}/create-component/plop-templates-tests`, // Test template implementation for components TBD
};

interface Answers {
  packageName: string;
  packageNpmName: string;
  componentName: string;
  hasStorybook?: boolean;
  doComponentTestBuild?: boolean;
  // hasTests?: boolean; // Test template implementation for components TBD
  suggest?: any;
}
//#endregion

//#region Module Export
module.exports = (plop: NodePlopAPI) => {
  plop.setWelcomeMessage('This utility is a helper to create converged React components');

  plop.setActionType('confirmPackageLocation', confirmPackageLocation);
  plop.setActionType('appendToPackageIndex', appendToPackageIndex);
  plop.setActionType('checkIfComponentAlreadyExists', checkIfComponentAlreadyExists);

  plop.setGenerator('package', {
    description: 'New package',

    prompts: [
      {
        type: 'list',
        name: 'packageNpmName',
        message: 'Which package to create the new component in?',
        choices: () => {
          return projectsWithStartCommand.map(project => project.title);
        },
      },

      {
        type: 'input',
        name: 'componentName',
        message: 'New component name (ex: MyComponent):',
        when: answers => answers.packageNpmName,
        validate: (input: string) =>
          /^[A-Z][a-zA-Z0-9]+$/.test(input) || 'Must enter a PascalCase component name (ex: MyComponent)',
      },
      {
        type: 'confirm',
        name: 'doComponentTestBuild',
        message: 'Do you wish to run a test build after component creation (Y/n):',
        default: true,
        when: answers => answers.packageNpmName,
      },
      {
        type: 'confirm',
        name: 'hasStorybook',
        message: 'Will this package have storybook examples? (Y/n):',
        default: true,
        when: answers => answers.packageNpmName,
      },
      // Test template implementation for components TBD
      // {
      //   type: 'confirm',
      //   name: 'hasTests',
      //   message: 'Will this component have a test? (Y/n):',
      //   default: true,
      //   when: answers => answers.packageNpmName,
      // },
    ],

    actions: (answers: Answers): Actions => {
      const globOptions: AddManyActionConfig['globOptions'] = { dot: true };

      const data = {
        ...answers,
        packageName: answers.packageNpmName.replace('@fluentui/', ''),
      };

      const renderString = (text: string): string => {
        return plop.renderString(text, data);
      };

      return [
        () => 'Running create-component actions',
        {
          type: 'confirmPackageLocation',
          data,
        },
        {
          type: 'checkIfComponentAlreadyExists',
          data,
        },
        {
          // Copy component templates
          type: 'addMany',
          destination: renderString(rootPaths.package),
          globOptions,
          data,
          skipIfExists: true,
          base: 'plop-templates-component',
          templateFiles: [`${renderString(templatePaths.component)}/**/*`],
        },
        {
          type: 'appendToPackageIndex',
          data,
        },
        {
          // Copy/Update storybook templates
          type: 'addMany',
          destination: renderString(rootPaths.storybookPackageComponent),
          globOptions,
          data,
          skipIfExists: true,
          skip: () => {
            if (!data.hasStorybook) return 'Skipping storybook scaffolding';
          },
          base: 'plop-templates-storybook',
          templateFiles: [`${renderString(templatePaths.storybookComponent)}/**/*`],
        },
        () => {
          console.log(
            stripIndent(`
              Package files created! Running yarn to link...
            `),
          );
          const yarnResult = spawnSync('yarn', ['--ignore-scripts'], { cwd: root, stdio: 'inherit', shell: true });
          if (yarnResult.status !== 0) {
            console.error('Something went wrong with running yarn. Please check previous logs for details');
            process.exit(1);
          }
          return 'Packages linked!';
        },
        () => {
          if (answers.doComponentTestBuild !== true) return 'Skipping component test compile.';

          console.log('Component files created! Running yarn build...\n');
          const yarnResult = spawnSync('yarn', [`buildto *${data.packageName}`], {
            cwd: root,
            stdio: 'inherit',
            shell: true,
          });
          if (yarnResult.status !== 0) {
            console.error('Something went wrong with building. Please check previous logs for details');
            process.exit(1);
          }
          return 'Component compiled!';
        },
        stripIndent(`
          Created new component! Please check over it and ensure wording and included files
          make sense for your scenario.
        `),
      ];
    },
  });
};
//#endregion

//#region Plop Custom Actions
const confirmPackageLocation = (answers: object, config: object, plop: object): string => {
  const { packageName } = answers as Answers;
  const plopAPI = plop as NodePlopAPI;
  const location = plopAPI.renderString(rootPaths.package, answers);
  if (fs.existsSync(location) !== true) {
    displayAndThrowError(
      `**ABORTING** The package ${packageName} cannot be found at location ${location}. Use yarn create-package first.`,
    );
  }
  if (fs.existsSync(`${location}/src/index.ts`) !== true) {
    displayAndThrowError(`**ABORTING** The package ${packageName} was found but missing src/index.ts`);
  }

  return `Found package ${packageName} at location: ${rootPaths.package}`;
};

const checkIfComponentAlreadyExists = (answers: object, config: object, plop: object): string => {
  const { componentName } = answers as Answers;
  const plopAPI = plop as NodePlopAPI;
  const location = plopAPI.renderString(rootPaths.component, answers);

  if (fs.existsSync(location) === true && fs.readdirSync(location).length > 0) {
    displayAndThrowError(`**ABORTING** The component ${componentName} already exists at ${location}`);
  }
  return `Component ${componentName} doesn't exist.`;
};

const appendToPackageIndex = async (answers: object, config: object, plop: object): Promise<string> => {
  const { componentName, packageName } = answers as Answers;
  const plopAPI = plop as NodePlopAPI;

  const options = { flag: 'a' };
  // get the package index file path
  const indexPath = plopAPI.renderString(`${rootPaths.package}/src/index.ts`, answers);
  const appendLine = plopAPI.renderString(`export * from './{{componentName}}';`, answers);
  // read contents and see if line is exists
  return fs
    .readFile(indexPath, { encoding: 'utf8', flag: 'r' })
    .then(async data => {
      const lines = data.split(/\r?\n/);
      const getIndex = (arr: string[], item: string): number =>
        lines.findIndex(line => item.toLocaleLowerCase() === line.toLocaleLowerCase());
      if (getIndex(lines, appendLine) === -1) {
        // doesn't exist so append
        await fs.outputFile(indexPath, `${appendLine}${os.EOL}`, options);
        return `Updated package ${packageName} index.ts to include ${componentName}`;
      }
      return `Package ${packageName} index.ts already contains reference to ${componentName}`;
    })
    .catch(error => {
      throw `**ABORTING** There was an error reading index file at ${indexPath}. Error: ${error}`;
    });
};
//#endregion

//#region Utilities
const displayAndThrowError = (message: string) => {
  console.log(message);
  throw message;
};

//#endregion

const ignoreProjects = [
  '@fluentui/azure-themes',
  '@fluentui/docs',
  '@fluentui/dom-utilities',
  '@fluentui/foundation-legacy',
  '@fluentui/react-examples',
  '@fluentui/react-next',
  '@fluentui/react',
  '@fluentui/test-utilities',
  '@fluentui/theme',
  '@fluentui/webpack-utilities',
];

const projectsWithStartCommand = Object.entries(allPackages)
  .filter(
    ([pkg, info]) =>
      !ignoreProjects.includes(pkg) &&
      info.packagePath.startsWith('packages') &&
      info.packageJson.dependencies &&
      info.packageJson.dependencies['@fluentui/react-compose'] !== undefined,
  )
  .map(([pkg, info]) => ({ title: pkg, value: { pkg, command: 'start' } }));
