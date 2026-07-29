import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { TagPickerOption } from './TagPickerOption';
import type { TagPickerOptionProps } from './TagPickerOption.types';

describe('TagPickerOption', () => {
  isConformant<TagPickerOptionProps>({
    Component: TagPickerOption,
    displayName: 'TagPickerOption',
    requiredProps: { value: 'value', media: <></>, secondaryContent: <></> },
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last, then
    // `useOptionStyles_unstable` prepends Option's own classes and carries the whole string
    // through (DECISIONS.md D2/D9). `classname-overrides-win` is its cascade-native replacement.
    disabledTests: ['make-styles-overrides-win'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
    testOptions: {
      // A TagPickerOption IS an Option — the delegation to `useOptionStyles_unstable` stamps
      // its marker on this same element, so this root legitimately carries both
      // (DECISIONS.md D16.3). Declaring the whole set keeps `component-has-group-marker`
      // running: it is an exact set comparison, so an undeclared marker still fails, and its
      // `classList[0]` half — the D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on
      // — is asserted here rather than locally.
      'has-group-marker': {
        markers: ['group/fui-option', 'group/fui-tag-picker-option'],
      },
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TagPickerOption value="value">Default TagPickerOption</TagPickerOption>);
    expect(result.container).toMatchSnapshot();
  });
});
