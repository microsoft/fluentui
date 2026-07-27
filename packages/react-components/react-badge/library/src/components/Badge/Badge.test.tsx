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
    disabledTests: ['make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      'has-static-classnames': [
        {
          props: { icon: 'Test Icon' },
        },
      ],
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
