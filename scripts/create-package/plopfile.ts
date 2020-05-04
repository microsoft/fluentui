import { NodePlopAPI } from 'plop';
import * as path from 'path';
import * as fs from 'fs-extra';
import { spawnSync } from 'child_process';
import { findGitRoot, PackageJson } from '../monorepo/index';

const root = findGitRoot();

module.exports = (plop: NodePlopAPI) => {
  let packageName: string;

  plop.setGenerator('package', {
    description: 'New package',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name (do NOT include @fluentui prefix)',
        validate: input => {
          // TODO: find proper way for data function to get name
          packageName = input;
          return /^[a-z-]+$/.test(input) ? true : 'Must enter a valid unscoped npm package name';
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        templateFiles: ['plop-templates/**/*', /* dotfiles */ 'plop-templates/.*'],
        destination: 'packages/{{packageName}}',
        // Get extra template parameters
        data: () => ({
          packageName,
          packageNpmName: '@fluentui/' + packageName,
          friendlyPackageName: packageName.replace(
            /^.|-./g, // first char or char after -
            (substr, index) => (index > 0 ? ' ' : '') + substr.replace('-', '').toUpperCase(),
          ),
          ...getDepVersions(),
        }),
      },
      () => {
        console.log('\nPackage files created! Running yarn to link...\n');
        const yarnResult = spawnSync('yarn', ['--ignore-scripts'], { cwd: root, stdio: 'inherit' });
        if (yarnResult.status !== 0) {
          console.error('Something went wrong with running yarn. Please check previous logs for details');
          process.exit(1);
        }
        return 'Packages link';
      },
      '\nCreated and linked new package! ' +
        'Please check over it and ensure wording and included files make sense for your scenario.',
    ],
  });
};

function getDepVersions() {
  // The package.json template has an additional tag for the version of each dependency.
  // This is preferable over hardcoding dependency versions to keep things in sync.
  // As of writing, @uifabric/experiments also depends on all the packages the template needs,
  // so we grab the current versions from there and add tags for them in the view object.
  const data: { [tagName: string]: string } = {};
  const experimentsPackageJson: PackageJson = fs.readJSONSync(path.join(root, 'packages/experiments/package.json'));
  const templatePackageJson: PackageJson = fs.readJSONSync(path.join(__dirname, 'plop-templates/package.json'));
  const deps = { ...templatePackageJson.devDependencies, ...templatePackageJson.dependencies };
  const depVersions = { ...experimentsPackageJson.devDependencies, ...experimentsPackageJson.dependencies };
  const packages = Object.keys(deps);
  for (const pkg of packages) {
    if (depVersions[pkg]) {
      // The package versions use triple braced tags to prevent Handlebars from HTML encoding the text
      const tagName = deps[pkg].replace('{{{', '').replace('}}}', '');
      data[tagName] = depVersions[pkg];
    } else {
      console.warn(`Could not determine appropriate version of ${pkg} from @uifabric/experiments package.json`);
    }
  }
  data.typesReactPeerDep = experimentsPackageJson.peerDependencies['@types/react'];
  data.typesReactDomPeerDep = experimentsPackageJson.peerDependencies['@types/react-dom'];
  data.reactPeerDep = experimentsPackageJson.peerDependencies.react;
  data.reactDomPeerDep = experimentsPackageJson.peerDependencies['react-dom'];

  return data;
}
