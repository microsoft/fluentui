import { BeachballConfig } from 'beachball';
import { renderHeader, renderEntry } from './customRenderers';
import { getScopes } from './getScopes';
import { getVNextChangelogGroups } from './getVNextChangelogGroups';
import { writeFile } from 'fs-extra';
import { exec } from 'child_process';
import * as path from 'path';

export const config: BeachballConfig = {
  disallowedChangeTypes: ['major', 'prerelease'],
  tag: 'latest',
  generateChangelog: true,
  scope: getScopes(),
  changelog: {
    customRenderers: {
      renderHeader,
      renderEntry,
    },
    groups: [getVNextChangelogGroups()],
  },
  hooks: {
    postpublish: async (packagePath, name, version) => {
      await writeFile(path.resolve(packagePath, '.npmrc'), '//registry.npmjs.org/:_authToken=${NPM_TOKEN}');

      // Following https://github.com/microsoft/fluentui/pull/20352 all prerelease versions are released with `latest`
      // Adds a post publish hook to continue to tag prerelease versions with appropriate tags
      // can be removed once v9 is fully released
      const tag = 'beta';
      if (version.includes(tag) && process.env.RELEASE_VNEXT) {
        return new Promise((resolve, reject) => {
          console.log(`tagging ${name}@${version} with ${tag}`);

          exec(`npm dist-tag add ${name}@${version} ${tag}`, { cwd: packagePath }, (error, stdout, stderr) => {
            if (error && error.code !== 0) {
              console.error(`failed to tag ${name} with ${tag}`);
              console.error(stderr);
              reject();
              return;
            }

            console.log(stdout);
            resolve();
          });
        });
      }
    },
  },
};
