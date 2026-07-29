import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverTitle } from './TeachingPopoverTitle';
import type { TeachingPopoverTitleProps } from './TeachingPopoverTitle.types';

describe('TeachingPopoverTitle', () => {
  isConformant<TeachingPopoverTitleProps>({
    Component: TeachingPopoverTitle,
    displayName: 'TeachingPopoverTitle',
    requiredProps: {},
    disabledTests: [
      // Griffel → Tailwind + CSS Modules migration — same rationale as TeachingPopoverBody's
      // wrapper: `make-styles-overrides-win` can no longer observe a clsx-composed component
      // and `classname-overrides-win` below is its cascade-native replacement
      // (DECISIONS.md D9).
      'make-styles-overrides-win',
      // Title dismiss is optionally rendered — and, since D16.1, this package publishes no
      // BEM statics at all, which is the other half of why this test cannot apply.
      'component-has-static-classnames-object',
    ],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverTitle>Default TeachingPopoverTitle</TeachingPopoverTitle>);
    expect(result.container).toMatchSnapshot();
  });
});
