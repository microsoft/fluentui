import { BeachballConfig } from 'beachball';
import { renderHeader, renderEntry } from './customRenderers';
import { getScopes } from './getScopes';
import { getVNextChangelogGroups } from './getVNextChangelogGroups';
import { execSync } from 'child_process';

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
    postpublish: (packagePath, name, version) => {
      // Following https://github.com/microsoft/fluentui/pull/20352 all prerelease versions are released with `latest`
      // Adds a post publish hook to continue to tag prerelease versions with appropriate tags
      // can be removed once v9 is fully released
      if (version.indexOf('beta') !== -1 && process.env.RELEASE_VNEXT) {
        const tag = 'beta';
        try {
          console.log(`tagging ${name}@${version} with ${tag}`);
          const res = execSync(`npm dist-tag add ${name}@${version} ${tag}`);
          console.log(res.toString());
        } catch (err) {
          console.error(`failed to tag ${name} with ${tag}`);
          if (err.stderr) {
            console.error(err.stderr);
          }
        }
      }
    },
  },
};
