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
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    disabledTests: ['component-has-static-classnames-object'],
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
