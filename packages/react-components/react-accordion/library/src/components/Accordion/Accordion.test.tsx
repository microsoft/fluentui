import * as React from 'react';
import { render } from '@testing-library/react';

import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Accordion } from './Accordion';

describe('Accordion', () => {
  isConformant({
    Component: Accordion,
    displayName: 'Accordion',
    disabledTests: [
      // Accordion does not have own styles
      'consistent-callback-args',
      // Statics removal (DECISIONS.md D16.1 / D16.6). Accordion no longer renders a
      // `fui-Accordion` BEM static, and `accordionClassNames` is now `{ root: <marker> }`,
      // so all three sub-tests of this rule — the export shape, the hard-coded
      // `fui-<Component>__<slot>` format, and the rendered-class assertion — are testing a
      // contract the component is deliberately no longer under. It is replaced by
      // `component-has-group-marker` (now a default test), which asserts the contract that DID replace it.
      'component-has-static-classnames-object',
    ],
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-group-marker` asserts the D16 public contract: exactly one
    // `group/fui-accordion` marker on the outermost slot, and never at `classList[0]`
    // (DECISIONS.md D15.1 / D16.2 — the nwsapi `:scope` invariant).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  /**
   * Note: see more visual regression tests for Accordion in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<Accordion>Default Accordion</Accordion>);
    expect(container).toMatchSnapshot();
  });
});
