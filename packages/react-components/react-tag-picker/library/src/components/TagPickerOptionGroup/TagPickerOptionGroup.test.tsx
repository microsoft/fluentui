import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TagPickerOptionGroup } from './TagPickerOptionGroup';

describe('TagPickerOptionGroup', () => {
  isConformant({
    Component: TagPickerOptionGroup,
    displayName: 'TagPickerOptionGroup',
    requiredProps: {
      label: 'label',
    },
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    testOptions: {
      // A TagPickerOptionGroup IS an OptionGroup — the delegation above stamps its marker on
      // this same element, so this root legitimately carries both (DECISIONS.md D16.3).
      // Declaring the whole set keeps `component-has-group-marker` running: it is an exact set
      // comparison, so an undeclared marker still fails, and its `classList[0]` half — the
      // D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on — is asserted here.
      'has-group-marker': {
        markers: ['group/fui-option-group', 'group/fui-tag-picker-option-group'],
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerOptionGroup>Default TagPickerOptionGroup</TagPickerOptionGroup>);
    expect(result.container).toMatchSnapshot();
  });
});
