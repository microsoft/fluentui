import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TagPickerGroup } from './TagPickerGroup';
import { TagPickerContextProvider, tagPickerContextDefaultValue } from '../../contexts/TagPickerContext';

const Wrapper: React.FC<{ children?: React.ReactNode }> = props => (
  <TagPickerContextProvider
    value={{
      ...tagPickerContextDefaultValue,
      selectedOptions: ['some option'],
    }}
  >
    {props.children}
  </TagPickerContextProvider>
);

describe('TagPickerGroup', () => {
  isConformant({
    Component: TagPickerGroup,
    renderOptions: { wrapper: Wrapper },
    displayName: 'TagPickerGroup',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    testOptions: {
      // A TagPickerGroup IS a TagGroup — `useTagGroupStyles_unstable` stamps its marker on this
      // same element, so this root legitimately carries both (DECISIONS.md D16.3). Declaring the
      // whole set keeps `component-has-group-marker` running: it is an exact set comparison, so
      // an undeclared marker still fails, and its `classList[0]` half — the D16.2 invariant that
      // nwsapi's jsdom `:scope` polyfill depends on — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-tag-group', 'group/fui-tag-picker-group'],
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerGroup>Default TagPickerGroup</TagPickerGroup>);
    expect(result.container).toMatchSnapshot();
  });
});
