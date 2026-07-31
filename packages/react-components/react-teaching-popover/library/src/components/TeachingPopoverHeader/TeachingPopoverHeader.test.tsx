import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverHeader } from './TeachingPopoverHeader';
import type { TeachingPopoverHeaderProps } from './TeachingPopoverHeader.types';

describe('TeachingPopoverHeader', () => {
  isConformant<TeachingPopoverHeaderProps>({
    Component: TeachingPopoverHeader,
    displayName: 'TeachingPopoverHeader',
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
    const result = render(<TeachingPopoverHeader>Default TeachingPopoverHeader</TeachingPopoverHeader>);
    expect(result.container).toMatchSnapshot();
  });
});
