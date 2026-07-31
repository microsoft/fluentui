import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Label } from './Label';
import { isConformant } from '../../testing/isConformant';

describe('Label', () => {
  isConformant({
    Component: Label,
    displayName: 'Label',
    requiredProps: { children: "I'm a label." },
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` is disabled because this package no longer
    // publishes BEM statics (DECISIONS.md D16.1): the test hard-codes the
    // `fui-<Component>` / `fui-<Component>__<slot>` format and asserts those classes are
    // rendered, both of which are exactly what D16 retires. `component-has-group-marker`
    // (now a default test) replaces it — it asserts the group marker IS stamped and, per D16.2, is never
    // `classList[0]`. The `has-static-classnames` testOptions entry goes with it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<Label>Default Label</Label>);
    expect(result.container).toMatchSnapshot();
  });

  it('renders a custom asterisk', () => {
    const result = render(
      <Label required="foo" data-testid="label-id">
        I'm a label
      </Label>,
    );
    const label = result.getByTestId('label-id');
    const requiredSlot = label.children[0];
    if (requiredSlot) {
      expect(requiredSlot.innerHTML).toBe('foo');
    } else {
      throw Error('Custom required text was not rendered');
    }
    expect(result.baseElement).toMatchSnapshot();
  });
});
