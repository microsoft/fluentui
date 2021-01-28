import { NodePlopAPI, AddManyActionConfig } from 'plop';
import { Actions } from 'node-plop';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as jju from 'jju';
import { spawnSync } from 'child_process';
import { findGitRoot, PackageJson } from '../monorepo/index';

const root = findGitRoot();

interface Answers {
  packageName: string;
  target: 'react' | 'node';
  description: string;
  hasTests?: boolean;
  hasExamples?: boolean;
}

module.exports = (plop: NodePlopAPI) => {
  plop.setGenerator('package', {
    description: 'New package',

    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name (do NOT include @fluentui prefix):',
        validate: (input: string) => /^[a-z\d-]+$/.test(input) || 'Must enter a valid unscoped npm package name',
      },
      {
        type: 'list',
        name: 'target',
        choices: ['react', 'node'],
        default: 'react',
        message: 'Package target:',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Package description:',
        // no reasonable default for node packages
        default: (answers: Partial<Answers>) =>
          answers.target === 'react' ? 'React components for building web experiences' : undefined,
        validate: (input: string) => !!input || 'Must enter a description',
      },
      {
        type: 'confirm',
        name: 'hasTests',
        message: 'Will this package have tests?',
        default: true,
        when: answers => answers.target === 'node', // react always has tests
      },
      {
        type: 'confirm',
        name: 'hasExamples',
        message: 'Create example scaffolding?',
        default: true,
        when: answers => answers.target === 'react',
      },
    ],

    actions: (answers: Answers): Actions => {
      // hasTests should default to true / however under
      // react package it get's set to undefined.
      // we default hasTests to true in that scenario
      const { hasTests = true } = answers;
      answers = { ...answers, hasTests };

      const { packageName, target, hasExamples } = answers;

      const destination = `packages/${packageName}`;
      const exampleRoot = `packages/react-examples`;
      const exampleDestination = `${exampleRoot}/src/${packageName}`;
      const globOptions: AddManyActionConfig['globOptions'] = { dot: true };

      // Get derived template parameters
      const data = {
        packageNpmName: '@fluentui/' + packageName,
        friendlyPackageName: packageName.replace(
          /^.|-./g, // first char or char after -
          (substr, index) => (index > 0 ? ' ' : '') + substr.replace('-', '').toUpperCase(),
        ),
      };

      return [
        {
          // Universal files
          type: 'addMany',
          destination,
          globOptions,
          data,
          templateFiles: ['plop-templates/**/*'],
        },
        {
          // node- or react-specific files
          type: 'addMany',
          destination,
          globOptions,
          data,
          templateFiles: hasTests
            ? [`plop-templates-${target}/**/*`]
            : [`plop-templates-${target}/**/*`, `!(plop-templates-${target}/jest.config.js)`],
        },
        {
          // Example files
          type: 'addMany',
          destination: exampleDestination,
          globOptions,
          data,
          skip: () => {
            if (!hasExamples) {
              return 'Skipping example scaffolding';
            }
          },
          skipIfExists: true,
          base: `plop-templates-storybook`,
          templateFiles: [`plop-templates-storybook/**/*`],
        },
        {
          // update package.json
          type: 'modify',
          path: `${destination}/package.json`,
          transform: packageJsonContents => updatePackageJson(packageJsonContents, answers),
        },
        {
          // update example package.json
          // update package.json
          type: 'modify',
          path: `${exampleRoot}/package.json`,
          skip: () => {
            if (!hasExamples) {
              return 'Skipping react-examples package.json update';
            }
          },
          transform: packageJsonContents => updateExamplePackageJson(packageJsonContents, data.packageNpmName),
        },
        {
          // update tsconfig.json
          type: 'modify',
          path: `${destination}/tsconfig.json`,
          transform: tsconfigContents => updateTsconfig(tsconfigContents, hasTests),
        },
        () => {
          console.log('\nPackage files created! Running yarn to link...\n');
          const yarnResult = spawnSync('yarn', ['--ignore-scripts'], { cwd: root, stdio: 'inherit', shell: true });
          if (yarnResult.status !== 0) {
            console.error('Something went wrong with running yarn. Please check previous logs for details');
            process.exit(1);
          }
          return 'Packages linked!';
        },
        '\nCreated and linked new package! Please check over it and ensure wording, included files, ' +
          'settings, and dependencies make sense for your scenario.',
      ];
    },
  });
};

function updatePackageJson(packageJsonContents: string, answers: Answers): string {
  const { target, hasTests } = answers;

  // Copy dep versions in package.json from actual current versions.
  // This is preferable over hardcoding dependency versions to keep things in sync.
  // As of writing, @fluentui/react-experiments also depends on all the packages the React template needs,
  // so we grab the current versions from there (or @fluentui/codemods for the node template).
  const referencePackage = target === 'node' ? 'codemods' : 'react-experiments';
  const referencePackageJson: PackageJson = fs.readJSONSync(
    path.join(root, 'packages', referencePackage, 'package.json'),
  );
  const newPackageJson: PackageJson = JSON.parse(packageJsonContents);

  for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
    if (!newPackageJson[depType]) {
      continue;
    }
    for (const pkg of Object.keys(newPackageJson[depType])) {
      if (!hasTests && /\b(jest|enzyme|test)\b/.test(pkg)) {
        delete newPackageJson[depType][pkg];
      } else if (referencePackageJson[depType]?.[pkg]) {
        newPackageJson[depType][pkg] = referencePackageJson[depType][pkg];
      } else {
        console.warn(
          `Couldn't determine appropriate ${depType} version of ${pkg} from ${referencePackage} package.json`,
        );
      }
    }
  }

  if (!hasTests) {
    delete newPackageJson.scripts['start-test'];
    delete newPackageJson.scripts.test;
    delete newPackageJson.scripts['update-snapshots'];
  }

  return JSON.stringify(newPackageJson, null, 2);
}

function updateExamplePackageJson(packageJsonContents: string, packageNpmName: string): string {
  const newPackageJson: PackageJson = JSON.parse(packageJsonContents);
  // add the new package to the dependency list
  newPackageJson['dependencies'][packageNpmName] = '*';
  // sort the entries
  newPackageJson['dependencies'] = Object.entries(newPackageJson['dependencies'])
    .sort()
    .reduce((o, [k, v]) => ((o[k] = v), o), {});
  return JSON.stringify(newPackageJson, null, 2);
}

function updateTsconfig(tsconfigContents: string, hasTests: boolean | undefined): string {
  if (hasTests) {
    return tsconfigContents;
  }
  // Remove jest types if there aren't tests (use jju since tsconfig might have comments)
  const tsconfig = jju.parse(tsconfigContents);
  const types: string[] = tsconfig.compilerOptions.types;
  tsconfig.compilerOptions.types = types.filter(t => t !== 'jest');
  return jju.update(tsconfigContents, tsconfig, { mode: 'cjson', indent: 2 });
}
