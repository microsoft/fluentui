// @ts-check
const { execFileSync } = require('node:child_process');
const { existsSync, readFileSync } = require('node:fs');
const { posix } = require('node:path');

/** PR label skipping the check, for changes that don't affect styles (refactors, renames of internals). */
const OPT_OUT_LABEL = 'CSS Modules: no change needed';

const GRIFFEL_HOOK = /^packages\/react-components\/[^/]+\/library\/src\/.+\.styles\.ts$/;
const CSS_MODULE_IMPORT = /\bfrom\s+['"](\.{1,2}\/[^'"]+\.module\.css)['"]/g;

/**
 * Every Griffel style hook (`X.styles.ts`) has a hand-written CSS Modules style hook (`X.styles.css.ts`) used by the
 * `./css-modules` entry. A change to the Griffel hook must come with a change to the CSS Modules hook or to a stylesheet
 * it imports, otherwise the two entries drift apart.
 *
 * @param {string[]} changedFiles - repo-relative posix paths changed by the PR
 * @param {(file: string) => string | undefined} readFile - contents of a repo file at the PR head, `undefined` if absent
 * @returns {Array<{ file: string; expected: string[] }>} Griffel hooks changed without their CSS Modules counterpart
 */
function findUnpairedGriffelChanges(changedFiles, readFile) {
  const changed = new Set(changedFiles);

  return changedFiles
    .filter(file => GRIFFEL_HOOK.test(file) && !file.endsWith('.styles.css.ts'))
    .map(file => {
      const cssHook = file.replace(/\.styles\.ts$/, '.styles.css.ts');
      const stylesheets = [...(readFile(cssHook) ?? '').matchAll(CSS_MODULE_IMPORT)].map(match =>
        posix.join(posix.dirname(cssHook), match[1]),
      );
      return { file, expected: [cssHook, ...stylesheets] };
    })
    .filter(({ expected }) => !expected.some(file => changed.has(file)));
}

/**
 * @param {string} base - git revision the PR is compared against
 */
function main(base) {
  const changedFiles = execFileSync('git', ['diff', '--name-only', '--no-renames', `${base}...HEAD`], {
    encoding: 'utf-8',
  })
    .split('\n')
    .filter(Boolean);

  const unpaired = findUnpairedGriffelChanges(changedFiles, file =>
    existsSync(file) ? readFileSync(file, 'utf-8') : undefined,
  );

  for (const { file, expected } of unpaired) {
    console.log(
      `::error file=${file}::Griffel styles changed without their CSS Modules version. Update ${expected.join(
        ' or ',
      )} as well, or add the "${OPT_OUT_LABEL}" label if the change doesn't affect styles.`,
    );
  }

  if (unpaired.length > 0) {
    process.exitCode = 1;
  } else {
    console.log('Every changed Griffel style hook comes with its CSS Modules version ✅');
  }
}

if (require.main === module) {
  const base = process.argv[2];
  if (!base) {
    throw new Error('usage: node scripts/github/src/css-modules-co-change.js <base>');
  }
  main(base);
}

module.exports = { OPT_OUT_LABEL, findUnpairedGriffelChanges };
