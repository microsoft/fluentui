// NOTE: remove once https://github.com/nrwl/nx/issues/26589 is fixed
// Copied/Modified code from https://github.com/nrwl/nx/blob/master/packages/nx/src/command-line/release/utils/git.ts#L45

import { execCommand } from 'nx/src/command-line/release/utils/exec-command';
import { interpolate } from 'nx/src/tasks-runner/utils';

// https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
const SEMVER_REGEX =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/g;

export async function getLatestGitTagForPattern(
  releaseTagPattern: string,
  additionalInterpolationData = {},
): Promise<{ tag: string; extractedVersion: string } | null> {
  try {
    // WE NEED TAGS FROM WHOLE REPO
    const tags = await execCommand('git', ['tag', '--sort', '-v:refname']).then(r =>
      r
        .trim()
        .split('\n')
        .map(t => t.trim())
        .filter(Boolean),
    );

    if (!tags.length) {
      return null;
    }

    const interpolatedTagPattern = interpolate(releaseTagPattern, {
      version: '%v%',
      projectName: '%p%',
      ...additionalInterpolationData,
    });

    const tagRegexp = `^${escapeRegExp(interpolatedTagPattern).replace('%v%', '(.+)').replace('%p%', '(.+)')}`;

    const matchingSemverTags = tags.filter(
      tag =>
        // Do the match against SEMVER_REGEX to ensure that we skip tags that aren't valid semver versions
        !!tag.match(tagRegexp) && tag.match(tagRegexp)?.some(r => r.match(SEMVER_REGEX)),
    );

    if (!matchingSemverTags.length) {
      return null;
    }

    // @ts-expect-error - nx source uses different TS setup - ignore for now
    const [latestMatchingTag, ...rest] = matchingSemverTags[0].match(tagRegexp);
    const version = rest.filter(r => {
      return r.match(SEMVER_REGEX);
    })[0];

    return {
      tag: latestMatchingTag,
      extractedVersion: version,
    };
  } catch {
    return null;
  }
}
function escapeRegExp(value: string) {
  return value.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}
