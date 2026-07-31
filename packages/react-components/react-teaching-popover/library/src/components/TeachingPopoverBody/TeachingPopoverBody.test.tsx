import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverBody } from './TeachingPopoverBody';

describe('TeachingPopoverBody', () => {
  isConformant({
    Component: TeachingPopoverBody,
    displayName: 'TeachingPopoverBody',
    requiredProps: { media: <img src={'./test'} /> },
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because this package no longer
    // publishes BEM statics (DECISIONS.md D16.1): the test hard-codes the `fui-<Component>`
    // format and asserts those classes are rendered, both of which are exactly what D16
    // retires. `component-has-group-marker` (a default test) replaces it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverBody>Default TeachingPopoverBody</TeachingPopoverBody>);
    expect(result.container).toMatchSnapshot();
  });
});
