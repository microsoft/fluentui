import { NodePlopAPI, AddManyActionConfig } from 'plop';
import { Actions } from 'node-plop';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as jju from 'jju';
import _ from 'lodash';
import chalk from 'chalk';
import { spawnSync } from 'child_process';
import { findGitRoot, PackageJson } from '../monorepo/index';
import { NxJsonConfiguration } from '@nrwl/devkit';
import { WorkspaceJsonConfiguration } from '@nrwl/tao/src/shared/workspace';

const root = findGitRoot();

interface Answers {
  /** Package name without scope */
  packageName: string;
  target: 'react' | 'node';
  description: string;
  publish: boolean;
  hasTests?: boolean;
  isConverged?: boolean;
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
        name: 'isConverged',
        message: 'Is this a converged package?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'publish',
        message: 'Should the package be published right away?',
        default: false,
      },
    ],
    actions: (answers: Answers): Actions => {
      if (answers.target === 'react') answers = { hasTests: true, ...answers };
      const { packageName, target, hasTests } = answers;

      const destination = `packages/${packageName}`;
      const globOptions: AddManyActionConfig['globOptions'] = { dot: true };

      // Get derived template parameters
      const data = {
        packageNpmName: '@fluentui/' + packageName,
        packageVersion: answers.isConverged ? '9.0.0-alpha.0' : '0.1.0',
        friendlyPackageName: packageName.replace(
          /^.|-./g, // first char or char after -
          (substr, index) => (index > 0 ? ' ' : '') + substr.replace('-', '').toUpperCase(),
        ),
      };

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
          transform: packageJsonContents => updatePackageJson(packageJsonContents, answers),
        },
        // update tsconfig.json
        {
          type: 'modify',
          path: `${destination}/tsconfig.json`,
          transform: tsconfigContents => updateTsconfig(tsconfigContents, hasTests),
        },
        // update nx workspace
        () => {
          updateNxWorkspace(answers, { root, projectName: data.packageNpmName, projectRoot: destination });
          return chalk.blue(`nx workspace updated`);
        },
        // run migrations if it's a converged package
        () => {
          if (!answers.isConverged) {
            return 'Skipping migrate-converged-pkg since this is not a converged package';
          }

          console.log(`\nRunning migrate-converged-pkg...`);
          const migrateResult = spawnSync(
            'yarn',
            ['nx', 'workspace-generator', 'migrate-converged-pkg', `--name='${data.packageNpmName}'`],
            { cwd: root, stdio: 'inherit', shell: true },
          );
          if (migrateResult.status !== 0) {
            throw new Error('Something went wrong running the migration. Please check previous logs for details.');
          }
          return 'Successfully migrated package';
        },
        () => {
          console.log('\nPackage files created! Running yarn to link...\n');
          const yarnResult = spawnSync('yarn', ['--ignore-scripts'], { cwd: root, stdio: 'inherit', shell: true });
          if (yarnResult.status !== 0) {
            throw new Error('Something went wrong with running yarn. Please check previous logs for details');
          }

          return 'Packages linked!';
        },
        chalk.green.bold(
          'Created and linked new package! Please check over it and ensure wording, included files, ' +
            'settings, and dependencies make sense for your scenario.',
        ),
      ];
    },
  });
};

/**
 * Replace empty version specs in `newPackageJson` with versions from `referencePackages`.
 * Throws an error if versions of any deps weren't found.
 */
function replaceVersionsFromReference(
  referencePackages: string[],
  newPackageJson: PackageJson,
  answers: Answers,
): void {
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

  const errorPackages: string[] = [];

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
        // Record the error and wait to throw until later for better logs
        errorPackages.push(`${depPkg} (${depType})`);
      }
    }
  }
  if (errorPackages.length) {
    throw new Error(
      `Couldn't determine appropriate version of ${errorPackages.length} packages from ${referencePackages.join(
        ' or ',
      )} package.json:\n${errorPackages.map(line => `- ${line}`).join('\n')}`,
    );
  }
}

/**
 * Replace version placeholders in package.json with actual current versions referenced in the repo.
 * Returns the updated stringified JSON.
 */
function updatePackageJson(packageJsonContents: string, answers: Answers) {
  const { target, hasTests, publish } = answers;

  // Copy dep versions in package.json from actual current version specs.
  // This is preferable over hardcoding dependency versions to keep things in sync.
  // The reference package(s) may need to be updated over time as dependency lists change.
  const newPackageJson: PackageJson = JSON.parse(packageJsonContents);
  const referencePackages = target === 'node' ? ['codemods'] : ['react-menu'];
  replaceVersionsFromReference(referencePackages, newPackageJson, answers);

  if (!hasTests) {
    delete newPackageJson.scripts['start-test'];
    delete newPackageJson.scripts.test;
    delete newPackageJson.scripts['update-snapshots'];
  }

  if (publish) {
    delete newPackageJson.private;
  }

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
  const nxConfig: NxJsonConfiguration = jju.parse(nxConfigContent);
  Object.assign(nxConfig.projects, templates.config);

  const updatedNxWorkspace = jju.update(nxWorkspaceContent, nxWorkspace, { mode: 'json', indent: 2 });
  const updatedNxConfig = jju.update(nxConfigContent, nxConfig, { mode: 'json', indent: 2 });

  fs.writeFileSync(paths.workspace, updatedNxWorkspace, 'utf-8');
  fs.writeFileSync(paths.config, updatedNxConfig, 'utf-8');
}
