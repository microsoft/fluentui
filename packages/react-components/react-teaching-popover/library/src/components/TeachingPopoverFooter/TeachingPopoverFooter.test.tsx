import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverFooter } from './TeachingPopoverFooter';

describe('TeachingPopoverFooter', () => {
  isConformant({
    Component: TeachingPopoverFooter,
    displayName: 'TeachingPopoverFooter',

    requiredProps: {
      primary: 'Primary',
      secondary: 'Secondary',
    },
    // Griffel → Tailwind + CSS Modules migration — same rationale as TeachingPopoverBody's
    // wrapper: `make-styles-overrides-win` can no longer observe a clsx-composed component,
    // `classname-overrides-win` is its cascade-native replacement (DECISIONS.md D9), and the
    // BEM statics this package published are gone (D16.1) — including the `__primary` /
    // `__secondary` slot statics, whose styling now travels as hashed module classes composed
    // onto the two `Button` slot objects this hook holds (D16.3's M2).
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverFooter primary="Primary" secondary="Secondary">
        Default TeachingPopoverFooter
      </TeachingPopoverFooter>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
