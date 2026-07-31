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
      // `classname-overrides-win` (extraTests below) pins the styling override contract
      // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
      // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
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
