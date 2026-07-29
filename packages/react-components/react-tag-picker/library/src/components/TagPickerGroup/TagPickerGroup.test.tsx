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
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — `useTagGroupStyles_unstable` runs first and leaves
    // the consumer className trailing, and everything this hook adds is PREPENDED to that
    // string, so the consumer's className is still last overall (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement — the promise the
    // pre-conversion comment here deferred until "react-tag-picker itself converts".
    disabledTests: ['make-styles-overrides-win'],
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
