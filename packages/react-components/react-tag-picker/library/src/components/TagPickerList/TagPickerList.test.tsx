import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TagPickerList } from './TagPickerList';
import { TagPickerContextProvider, tagPickerContextDefaultValue } from '../../contexts/TagPickerContext';

const Wrapper: React.FC<{ children?: React.ReactNode }> = props => (
  <TagPickerContextProvider
    value={{
      ...tagPickerContextDefaultValue,
      open: true,
    }}
  >
    {props.children}
  </TagPickerContextProvider>
);

describe('TagPickerList', () => {
  isConformant({
    Component: TagPickerList,
    displayName: 'TagPickerList',
    renderOptions: { wrapper: Wrapper },
    requiredProps: { children: 'Default TagPickerList' },
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    testOptions: {
      // A TagPickerList IS a Listbox — the `root` slot's elementType is react-combobox's
      // `<Listbox>`, whose hook stamps its marker on this same element, so this root
      // legitimately carries both (DECISIONS.md D16.3). Declaring the whole set keeps
      // `component-has-group-marker` running: it is an exact set comparison, so an undeclared
      // marker still fails, and its `classList[0]` half — the D16.2 invariant nwsapi's jsdom
      // `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-listbox', 'group/fui-tag-picker-list'],
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerList>Default TagPickerList</TagPickerList>);
    expect(result.container).toMatchSnapshot();
  });
});
