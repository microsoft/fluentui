import { matchesGlob } from 'path';

import baseConfig from '../base.config';

describe('Beachball ignore patterns', () => {
  it.each([
    'packages/react/README.md',
    'packages/react-components/react-avatar/library/README.md',
    'packages/codemods/documentation/howTo.md',
    'packages/codemods/documentation/renamePropTransforms.md',
    'packages/react-components/react-avatar/library/docs/SPEC.md',
    'packages/react-components/react-badge/library/docs/Spec.md',
    'packages/react-components/deprecated/react-alert/docs/Spec.md',
  ])('ignores documentation changes in %s', file => {
    expect(baseConfig.ignorePatterns.some(pattern => matchesGlob(file, pattern))).toBe(true);
  });

  it.each([
    'packages/react/src/components/Button/Button.tsx',
    'packages/react-components/react-avatar/library/src/components/Avatar/Avatar.tsx',
    'packages/react-components/react-avatar/library/etc/react-avatar.api.md',
    'packages/react-components/react-avatar/library/package.json',
    'packages/codemods/src/codeMods/renameProp.ts',
  ])('still requires changefiles for %s', file => {
    expect(baseConfig.ignorePatterns.some(pattern => matchesGlob(file, pattern))).toBe(false);
  });
});
