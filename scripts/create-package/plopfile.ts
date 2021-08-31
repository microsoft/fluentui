import { NodePlopAPI, AddManyActionConfig } from 'plop';
import { Actions } from 'node-plop';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as jju from 'jju';
import _ from 'lodash';
import chalk from 'chalk';
import { spawnSync } from 'child_process';
import { findGitRoot, PackageJson } from '../monorepo/index';
import { NxJson } from '@nrwl/workspace';
import { WorkspaceJsonConfiguration } from '@nrwl/tao/src/shared/workspace';

const root = findGitRoot();

interface Answers {
  packageName: string;
  target: 'react' | 'node';
  description: string;
  publish: boolean;
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
      {
        type: 'confirm',
        name: 'publish',
        message: answers =>
          answers.hasExamples
            ? 'Should the package be published right away (must be Yes for packages with example scaffolding)?'
            : 'Should the package be published right away?',
        default: (answers: Answers) => !!answers.hasExamples,
      },
    ],
    actions: (answers: Answers): Actions => {
      if (answers.target === 'react') answers = { hasTests: true, ...answers };
      const { packageName, target, hasExamples, hasTests } = answers;

      const destination = `packages/${packageName}`;
      const exampleRoot = `packages/react-examples`;
      const globOptions: AddManyActionConfig['globOptions'] = { dot: true };

      // Get derived template parameters
      const data = {
        packageNpmName: '@fluentui/' + packageName,
        packageVersion: '9.0.0-alpha.0',
        friendlyPackageName: packageName.replace(
          /^.|-./g, // first char or char after -
          (substr, index) => (index > 0 ? ' ' : '') + substr.replace('-', '').toUpperCase(),
        ),
      };

      let hasError = false;

      return [
        // Universal files
        {
          type: 'addMany',
          destination,
          globOptions,
          data,
          templateFiles: ['plop-templates/**/*'],
        },
        // node- or react-specific files
        {
          type: 'addMany',
          destination,
          globOptions,
          data,
          templateFiles: hasTests
            ? [`plop-templates-${target}/**/*`]
            : [`plop-templates-${target}/**/*`, `!(plop-templates-${target}/jest.config.js)`],
        },
        // update package.json
        {
          type: 'modify',
          path: `${destination}/package.json`,
          transform: packageJsonContents => {
            const { newPackageJson, hasError: hasUpdateError } = updatePackageJson(packageJsonContents, answers);
            hasError = hasError || hasUpdateError;
            return newPackageJson;
          },
        },
        // update react-examples package.json
        {
          type: 'modify',
          path: `${exampleRoot}/package.json`,
          skip: () => {
            if (!hasExamples) return 'Skipping react-examples package.json update';
          },
          transform: packageJsonContents =>
            updateExamplePackageJson(packageJsonContents, data.packageNpmName, data.packageVersion),
        },
        // update tsconfig.json
        {
          type: 'modify',
          path: `${destination}/tsconfig.json`,
          transform: tsconfigContents => updateTsconfig(tsconfigContents, hasTests),
        },

        answers => {
          if (hasError) {
            console.error(
              chalk.red.bold(
                '\nThere were one or more errors creating the package.\n' +
                  'Please look at the logs above, fix the issues, and then run `yarn` to link.',
              ),
            );
            return;
          }

          console.log(
            updateNxWorkspace(answers as Answers, { root, projectName: data.packageNpmName, projectRoot: destination }),
          );

          console.log('\nPackage files created! Running yarn to link...\n');
          const yarnResult = spawnSync('yarn', ['--ignore-scripts'], { cwd: root, stdio: 'inherit', shell: true });
          if (yarnResult.status !== 0) {
            console.error(
              chalk.red.bold('Something went wrong with running yarn. Please check previous logs for details'),
            );
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

/**
 * Replace empty version specs in `newPackageJson` with versions from `referencePackages`.
 * Returns true if all versions were replaced, false if not.
 */
function replaceVersionsFromReference(
  referencePackages: string[],
  newPackageJson: PackageJson,
  answers: Answers,
): boolean {
  const { hasTests } = answers;
  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies'] as const;

  // Read the package.json files of the given reference packages and combine into one object.
  // This way if a dep is defined in any of them, it can easily be copied to newPackageJson.
  const referenceDeps: Pick<PackageJson, 'dependencies' | 'devDependencies' | 'peerDependencies'> = _.merge(
    {},
    ...referencePackages.map(pkg =>
      _.pick(fs.readJSONSync(path.join(root, 'packages', pkg, 'package.json')), ...depTypes),
    ),
  );
  console.dir(referenceDeps);

  let hasError = false;

  for (const depType of depTypes) {
    if (!newPackageJson[depType]) {
      continue;
    }
    for (const depPkg of Object.keys(newPackageJson[depType])) {
      if (!hasTests && /\b(jest|enzyme|test|react-conformance|react-conformance-make-styles|)\b/.test(depPkg)) {
        delete newPackageJson[depType][depPkg];
      } else if (referenceDeps[depType]?.[depPkg]) {
        newPackageJson[depType][depPkg] = referenceDeps[depType][depPkg];
      } else {
        hasError = true;
        console.warn(
          chalk.yellow(
            `Couldn't determine appropriate ${depType} version of ${depPkg} from ${referencePackages.join(
              ' or ',
            )} package.json`,
          ),
        );
      }
    }
  }
  return hasError;
}

function updatePackageJson(packageJsonContents: string, answers: Answers) {
  const { target, hasTests, publish } = answers;

  // Copy dep versions in package.json from actual current version specs.
  // This is preferable over hardcoding dependency versions to keep things in sync.
  // The reference package(s) may need to be updated over time as dependency lists change.
  const newPackageJson: PackageJson = JSON.parse(packageJsonContents);
  const referencePackages = target === 'node' ? ['codemods'] : ['react-menu'];
  const hasError = replaceVersionsFromReference(referencePackages, newPackageJson, answers);

  if (!hasTests) {
    delete newPackageJson.scripts['start-test'];
    delete newPackageJson.scripts.test;
    delete newPackageJson.scripts['update-snapshots'];
  }

  if (publish) {
    delete newPackageJson.private;
  }

  return { newPackageJson: JSON.stringify(newPackageJson, null, 2), hasError };
}

function updateExamplePackageJson(packageJsonContents: string, packageNpmName: string, packageVersion: string): string {
  const newPackageJson: PackageJson = JSON.parse(packageJsonContents);
  // add the new package to the dependency list
  newPackageJson['dependencies'][packageNpmName] = packageVersion;
  // sort the entries
  newPackageJson['dependencies'] = Object.entries(newPackageJson['dependencies'])
    .sort()
    .reduce((o, [k, v]) => ((o[k] = v), o), {});
  return JSON.stringify(newPackageJson, null, 2);
}

function updateTsconfig(tsconfigContents: string, hasTests: boolean | undefined): string {
  if (hasTests) return tsconfigContents;
  // Remove jest types if there aren't tests (use jju since tsconfig might have comments)
  const tsconfig = jju.parse(tsconfigContents);
  const types: string[] = tsconfig.compilerOptions.types;
  tsconfig.compilerOptions.types = types.filter(t => t !== 'jest');
  return jju.update(tsconfigContents, tsconfig, { mode: 'cjson', indent: 2 });
}

function updateNxWorkspace(_answers: Answers, config: { root: string; projectName: string; projectRoot: string }) {
  const paths = {
    workspace: `${config.root}/workspace.json`,
    config: `${config.root}/nx.json`,
  };

  const templates = {
    workspace: {
      [config.projectName]: {
        root: config.projectRoot,
        projectType: 'library',
      },
    },
    config: {
      [config.projectName]: {
        implicitDependencies: [],
      },
    },
  };

  const nxWorkspaceContent = fs.readFileSync(paths.workspace, 'utf-8');
  const nxWorkspace: WorkspaceJsonConfiguration = jju.parse(nxWorkspaceContent);
  Object.assign(nxWorkspace.projects, templates.workspace);

  const nxConfigContent = fs.readFileSync(paths.config, 'utf-8');
  const nxConfig: NxJson = jju.parse(nxConfigContent);
  Object.assign(nxConfig.projects, templates.config);

  const updatedNxWorkspace = jju.update(nxWorkspaceContent, nxWorkspace, { mode: 'json', indent: 2 });
  const updatedNxConfig = jju.update(nxConfigContent, nxConfig, { mode: 'json', indent: 2 });

  fs.writeFileSync(paths.workspace, updatedNxWorkspace, 'utf-8');
  fs.writeFileSync(paths.config, updatedNxConfig, 'utf-8');

  return chalk.blue(`nx workspace updated`);
}
