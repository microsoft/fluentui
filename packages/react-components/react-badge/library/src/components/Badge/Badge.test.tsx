import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Badge } from './Badge';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';

describe('Badge', () => {
  isConformant({
    Component: Badge,
    displayName: 'Badge',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts `badgeClassNames` still holds
    // `fui-Badge` / `fui-Badge__<slot>` strings AND that they are rendered. Both are false by
    // design: DECISIONS.md D16.1 removed the BEM statics, D16.5 narrowed the export to
    // `{ root }` and re-pointed it at the group marker. `component-has-group-marker` (now a default test)
    // is its replacement and asserts the contract that actually holds now — including the
    // D15.1 `classList[0]` invariant the static used to satisfy incidentally (D16.2/D16.6).
    // Its `has-static-classnames` testOptions entry (which rendered an `icon` so the sub-slot
    // static could be found) goes with it.
    disabledTests: ['make-styles-overrides-win', 'component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  /**
   * Note: see more visual regression tests for Badge in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<Badge>Default Badge</Badge>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
