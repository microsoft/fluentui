import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Calendar } from './Calendar';
import { isConformant } from '../../testing/isConformant';

describe('Calendar', () => {
  isConformant({
    Component: Calendar,
    displayName: 'Calendar',
    disabledTests: [
      // compat components that are closer to their v8 counterparts do not adhere to this test
      'consistent-callback-args',
      // Calendar is not exported at the top level since it's an internal component
      'exported-top-level',
      // Calendar classnames are not exported since they are internal and are used differently compared to how v9
      // uses classnames
      'component-has-static-classnames-object',
      // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
      // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
      // it was called with the consumer className last; this component now composes with
      // clsx and never calls mergeClasses, so the test can no longer observe the contract.
      // The guarantee itself is unchanged — clsx puts the consumer `className` last and the
      // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
      // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
      'make-styles-overrides-win',
    ],
    // `component-has-group-marker` is a default test (DECISIONS.md D16.6) and asserts the
    // `group/fui-calendar` marker this root now stamps, plus the D15.1 `classList[0]`
    // invariant the removed BEM static used to satisfy incidentally.
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('should render without crashing when value is undefined', () => {
    expect(() => render(<Calendar value={undefined} />)).not.toThrow();
  });

  it('should render correctly when value is undefined', () => {
    const { container } = render(<Calendar value={undefined} />);
    expect(container.querySelector('[role="grid"]')).not.toBeNull();
  });
});
