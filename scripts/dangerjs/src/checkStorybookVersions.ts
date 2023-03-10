import * as fs from 'fs-extra';
import * as path from 'path';

import type { DangerJS } from './types';
import type { PackageJson } from '@fluentui/scripts-monorepo';
import { workspaceRoot } from './utils';

const packageJsonFilename = 'package.json';
const webComponentsPackageJsonFilename = 'packages/web-components/package.json';
const scriptFilename = path.relative(workspaceRoot, __filename);

/**
 * This check ensures that the `@storybook/html` dep is specified under web-components rather than
 * being moved to repo root, and that it's not missed when updating the versions of storybook deps.
 * (The second part is less essential, but nice to have in the interest of reducing duplication.)
 *
 * ### WHY `@storybook/html` DEP MUST NOT BE SPECIFIED AT ROOT:
 *
 * The package.json of each storybook framework (such as `@storybook/html` or `@storybook/react`) has
 * `bin` definitions for `build-storybook` and `start-storybook`, which are placed under `node_modules/.bin`.
 * If two dependencies specified in the same package.json (the workspace root in our case) define a `bin`
 * with the same name, it's **nondeterministic** which one "wins."
 *
 * Github Issue https://github.com/storybookjs/storybook/issues/3980#issuecomment-411328585
 *
 * The simplest and most reliable fix is that since `@storybook/html` is used only by web-components,
 * it should be specified there, with a `nohoist` entry in the root workspace config to ensure it's
 * installed under web-components rather than at the root.
 */
export async function checkStorybookVersions({ danger, fail }: DangerJS) {
  // Only run this check if the root package.json and/or web-components package.json was modified
  if (
    !danger.git.modified_files.includes(packageJsonFilename) &&
    !danger.git.modified_files.includes(webComponentsPackageJsonFilename)
  ) {
    return;
  }

  // Read the package.jsons and compare the dep versions.
  // (It would be possible to check the detailed diffs of the file and determine whether specifically
  // the @storybook/react line changed, but just reading and comparing the files is simpler.)
  const rootPackageJson: PackageJson = fs.readJSONSync(path.resolve(workspaceRoot, packageJsonFilename));
  const webComponentsPackageJson: PackageJson = fs.readJSONSync(
    path.resolve(workspaceRoot, webComponentsPackageJsonFilename),
  );

  const storybookReactVersion = rootPackageJson.devDependencies?.['@storybook/react'];
  const storybookHtmlVersion = webComponentsPackageJson.devDependencies?.['@storybook/html'];

  if (!storybookHtmlVersion || rootPackageJson.devDependencies?.['@storybook/html']) {
    // PLEASE READ THE FUNCTION COMMENT BEFORE MODIFYING OR REMOVING THIS CHECK!!!
    fail(
      `\`@storybook/html\` dependency must be specified in ONLY in \`${webComponentsPackageJsonFilename}\`, ` +
        `not in the root \`package.json\` (see comment in \`${scriptFilename}\` for details).`,
    );
  }
  if (!storybookReactVersion) {
    // This would be weird, but for completeness...
    fail(
      '`@storybook/react` has been removed from `devDependencies` in the root `package.json`. ' +
        `If this was intended, please update \`${scriptFilename}\`.`,
    );
  }

  if (storybookReactVersion && storybookHtmlVersion && storybookReactVersion !== storybookHtmlVersion) {
    // Doing an exact equality check for now since storybook publishes in lockstep
    // (can be refined if needed, or this part can be removed if the versions need to be different at some point)
    fail(
      `The version of \`@storybook/react\` (${storybookReactVersion}) specified in the root \`package.json\` ` +
        `does not match the version of \`@storybook/html\` (${storybookHtmlVersion}) specified in ` +
        `\`${webComponentsPackageJsonFilename}\`. These should generally be kept in sync.`,
    );
  }

  const hasStorybookHtmlNohoist = rootPackageJson.workspaces?.nohoist?.some((entry: string) =>
    entry.includes('@storybook/html'),
  );
  if (!hasStorybookHtmlNohoist) {
    fail(
      'The root `package.json` must contain a `nohoist` entry for `@storybook/html` ' +
        `(see comment in \`${scriptFilename}\` for details).`,
    );
  }
}
