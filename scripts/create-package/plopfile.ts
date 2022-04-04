import { NodePlopAPI, AddManyActionConfig } from 'plop';
import { Actions } from 'node-plop';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as jju from 'jju';
import _ from 'lodash';
import chalk from 'chalk';
import { spawnSync } from 'child_process';
import { findGitRoot, PackageJson } from '../monorepo/index';
import { WorkspaceJsonConfiguration } from '@nrwl/tao/src/shared/workspace';

const root = findGitRoot();

const v8ReferencePackages = {
  react: ['react'],
  node: ['codemods'],
};
const convergedReferencePackages = {
  react: ['react-provider'],
  node: ['babel-make-styles'],
};

interface Answers {
  /** Package name without scope */
  packageName: string;
  target: 'react' | 'node';
  description: string;
  codeowner: string;
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
        type: 'list',
        name: 'codeowner',
        message: 'Provide team that owns this package',
        choices: [
          '@microsoft/fluentui-react-build',
          '@microsoft/teams-prg',
          '@microsoft/cxe-coastal',
          '@microsoft/cxe-red',
          '@microsoft/cxe-prg',
        ],
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
        owner: answers.codeowner,
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
            [
              'nx',
              'workspace-generator',
              'migrate-converged-pkg',
              `--name='${data.packageNpmName}'`,
              `--owner='${data.owner}'`,
            ],
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
          'Created and linked new package! Notes:\n' +
            '- Please ensure wording, included files, settings, and dependencies make sense for your scenario.\n' +
            '- If the package should be published immediately, remove `"private": true` from package.json',
        ),
      ];
    },
  });
};

/**
 * Replace empty version specs in `newPackageJson` with versions from `referencePackages`.
 * (Also for converged packages, replaces the package version and adds beachball config.)
 * Throws an error if versions of any deps weren't found.
 */
function replaceVersionsFromReference(
  referencePackages: string[],
  newPackageJson: PackageJson,
  answers: Answers,
): void {
  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies'] as const;

  // Read the package.json files of the given reference packages and combine into one object.
  // This way if a dep is defined in any of them, it can easily be copied to newPackageJson.
  const packageJsons = referencePackages.map(pkg => fs.readJSONSync(path.join(root, 'packages', pkg, 'package.json')));
  const referenceDeps: Pick<PackageJson, 'dependencies' | 'devDependencies' | 'peerDependencies'> = _.merge(
    {},
    ...packageJsons.map(pkg => _.pick(pkg, ...depTypes)),
  );

  const errorPackages: string[] = [];

  for (const depType of depTypes) {
    if (!newPackageJson[depType]) {
      continue;
    }
    for (const depPkg of Object.keys(newPackageJson[depType])) {
      if (!answers.hasTests && /\b(jest|enzyme|test(ing)?|react-conformance)\b/.test(depPkg)) {
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
      `Couldn't determine appropriate version of dep(s) from package.json in referencePackages ${referencePackages.join(
        ' or ',
      )}:\n${errorPackages.map(line => `- ${line}`).join('\n')}`,
    );
  }

  if (answers.isConverged) {
    if (packageJsons[0].version?.[0] !== '9') {
      throw new Error(`Converged reference package ${packageJsons[0].name} does not appear to have version 9.x`);
    }
    // Update beachball config in package.json to match the current v9
    if (packageJsons[0].beachball) {
      newPackageJson.beachball = packageJsons[0].beachball;
    }
  }
}

/**
 * Replace version placeholders in package.json with actual current versions referenced in the repo.
 * Also updates the version and other properties as appropriate for converged packages.
 * Returns the updated stringified JSON.
 */
function updatePackageJson(packageJsonContents: string, answers: Answers) {
  const { target, hasTests, isConverged } = answers;

  // Copy dep versions in package.json from actual current version specs.
  // This is preferable over hardcoding dependency versions to keep things in sync.
  // The reference package(s) may need to be updated over time as dependency lists change.
  const newPackageJson: PackageJson = JSON.parse(packageJsonContents);
  const referencePackages = (isConverged ? convergedReferencePackages : v8ReferencePackages)[target];
  replaceVersionsFromReference(referencePackages, newPackageJson, answers);

  if (!hasTests) {
    delete newPackageJson.scripts['start-test'];
    delete newPackageJson.scripts.test;
    delete newPackageJson.scripts['update-snapshots'];
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
        implicitDependencies: [],
      },
    },
  };

  const nxWorkspaceContent = fs.readFileSync(paths.workspace, 'utf-8');
  const nxWorkspace: WorkspaceJsonConfiguration = jju.parse(nxWorkspaceContent);
  Object.assign(nxWorkspace.projects, templates.workspace);

  const updatedNxWorkspace = jju.update(nxWorkspaceContent, nxWorkspace, { mode: 'json', indent: 2 });

  fs.writeFileSync(paths.workspace, updatedNxWorkspace, 'utf-8');
}
