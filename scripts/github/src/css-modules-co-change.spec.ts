import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { OPT_OUT_LABEL, findUnpairedGriffelChanges } from './css-modules-co-change';

const dir = 'packages/react-components/react-button/library/src/components/Button';
const griffelHook = `${dir}/useButtonStyles.styles.ts`;
const cssHook = `${dir}/useButtonStyles.styles.css.ts`;

const files: Record<string, string> = {
  [cssHook]: `import styles from './Button.module.css';\nimport shared from '../shared.module.css';`,
};
const readFile = (file: string) => files[file];

describe('findUnpairedGriffelChanges', () => {
  it('accepts a Griffel hook changed with its CSS Modules hook', () => {
    expect(findUnpairedGriffelChanges([griffelHook, cssHook], readFile)).toEqual([]);
  });

  it('accepts a Griffel hook changed with a stylesheet its CSS Modules hook imports', () => {
    expect(findUnpairedGriffelChanges([griffelHook, `${dir}/Button.module.css`], readFile)).toEqual([]);
    expect(
      findUnpairedGriffelChanges(
        [griffelHook, 'packages/react-components/react-button/library/src/components/shared.module.css'],
        readFile,
      ),
    ).toEqual([]);
  });

  it('reports a Griffel hook changed alone', () => {
    expect(findUnpairedGriffelChanges([griffelHook, `${dir}/Button.tsx`], readFile)).toEqual([
      {
        file: griffelHook,
        expected: [
          cssHook,
          `${dir}/Button.module.css`,
          'packages/react-components/react-button/library/src/components/shared.module.css',
        ],
      },
    ]);
  });

  it('reports a Griffel hook whose CSS Modules hook is missing', () => {
    expect(findUnpairedGriffelChanges([griffelHook], () => undefined)).toEqual([
      { file: griffelHook, expected: [cssHook] },
    ]);
  });

  it('ignores files that are not v9 library Griffel hooks', () => {
    expect(
      findUnpairedGriffelChanges(
        [
          cssHook,
          `${dir}/Button.module.css`,
          'packages/react-components/react-button/stories/src/Button.styles.ts',
          'packages/react/src/components/Button/Button.styles.ts',
        ],
        readFile,
      ),
    ).toEqual([]);
  });
});

describe('css-modules-co-change workflow', () => {
  const workflow = readFileSync(resolve(__dirname, '../../../.github/workflows/css-modules-co-change.yml'), 'utf8');

  it('skips the check for PRs with the opt-out label', () => {
    expect(workflow).toContain(`'${OPT_OUT_LABEL}'`);
  });
});
