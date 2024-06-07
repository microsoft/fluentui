import { spawnSync } from 'child_process';
import * as path from 'path';

import { PackageJson, findGitRoot, flushTreeChanges, tree } from '@fluentui/scripts-monorepo';
import { addProjectConfiguration, getProjects } from '@nx/devkit';
import chalk from 'chalk';
import * as fs from 'fs-extra';
import _ from 'lodash';
import { Actions } from 'node-plop';
import { AddManyActionConfig, NodePlopAPI } from 'plop';

const root = findGitRoot();

const v8ReferencePackages = {
  react: ['@fluentui/react'],
  node: ['@fluentui/codemods'],
};
const convergedReferencePackages = {
  react: ['@fluentui/react-provider'],
  node: ['@fluentui/react-conformance-griffel'],
};

interface Answers {
  /** Package name without scope */
  packageName: string;
  target: 'node';
  description: string;
  codeowner: string;
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
        choices: ['node'],
        default: 'react',
        message: 'Package target:',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Package description:',
        // no reasonable default for node packages
        default: (answers: Partial<Answers>) => undefined,
        validate: (input: string) => !!input || 'Must enter a description',
      },
      {
        type: 'list',
        name: 'codeowner',
        message: 'Provide team that owns this package',
        choices: [
          '@microsoft/fluentui-react-build',
          '@microsoft/teams-prg',
          '@microsoft/cxe-red',
          '@microsoft/cxe-prg',
        ],
      },
      {
        type: 'confirm',
        name: 'isConverged',
        message: 'Is this a converged package?',
        default: true,
      },
    ],
    actions: (answers: Answers): Actions => {
      const { packageName, target } = answers;

      const destination = answers.isConverged
        ? `packages/react-components/${packageName}-preview`
        : `packages/${packageName}`;
      const globOptions: AddManyActionConfig['globOptions'] = { dot: true };

      // Get derived template parameters
      const data = {
        packageNpmName: '@fluentui/' + packageName + '-preview',
        packageVersion: '0.0.0',
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
          templateFiles: [`plop-templates-${target}/**/*`],
        },
        // update package.json
        {
          type: 'modify',
          path: `${destination}/package.json`,
          transform: packageJsonContents => updatePackageJson(packageJsonContents, answers),
        },
        // update nx workspace
        () => {
          updateNxProject(answers, { projectName: data.packageNpmName, projectRoot: destination });
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
          const tsConfigAllUpdate = spawnSync('yarn', ['nx', 'workspace-generator', 'tsconfig-base-all'], {
            cwd: root,
            stdio: 'inherit',
            shell: true,
          });
          if (tsConfigAllUpdate.status !== 0) {
            throw new Error(
              'Something went wrong while updating tsconfig.base.all.json. Please check previous logs for details.',
            );
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
  if (referencePackages.length === 0) {
    return;
  }

  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies'] as const;

  const projects = getProjects(tree);
  // Read the package.json files of the given reference packages and combine into one object.
  // This way if a dep is defined in any of them, it can easily be copied to newPackageJson.
  const packageJsons = referencePackages.map(pkgName => {
    const metadata = projects.get(pkgName);
    if (!metadata) {
      throw new Error(`Couldn't find metadata for package ${pkgName}`);
    }

    return fs.readJSONSync(path.join(metadata.root, 'package.json'));
  });

  const referenceDeps: Pick<PackageJson, 'dependencies' | 'devDependencies' | 'peerDependencies'> = _.merge(
    {},
    ...packageJsons.map(pkg => _.pick(pkg, ...depTypes)),
  );

  const errorPackages: string[] = [];

  for (const depType of depTypes) {
    const packageDependencies = newPackageJson[depType];
    if (!packageDependencies) {
      continue;
    }
    for (const depPkg of Object.keys(packageDependencies)) {
      if (referenceDeps[depType]?.[depPkg]) {
        packageDependencies[depPkg] = referenceDeps[depType]?.[depPkg] as string;
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
  }
}

/**
 * Replace version placeholders in package.json with actual current versions referenced in the repo.
 * Also updates the version and other properties as appropriate for converged packages.
 * Returns the updated stringified JSON.
 */
function updatePackageJson(packageJsonContents: string, answers: Answers) {
  const { target, isConverged } = answers;

  // Copy dep versions in package.json from actual current version specs.
  // This is preferable over hardcoding dependency versions to keep things in sync.
  // The reference package(s) may need to be updated over time as dependency lists change.
  const newPackageJson: PackageJson = JSON.parse(packageJsonContents);
  const referencePackages = (isConverged ? convergedReferencePackages : v8ReferencePackages)[target];
  replaceVersionsFromReference(referencePackages, newPackageJson, answers);

  return JSON.stringify(newPackageJson, null, 2);
}

function updateNxProject(_answers: Answers, config: { projectName: string; projectRoot: string }) {
  addProjectConfiguration(tree, config.projectName, {
    root: config.projectRoot,
    projectType: 'library',
    implicitDependencies: [],
    tags: ['vNext'],
  });

  flushTreeChanges();
}
