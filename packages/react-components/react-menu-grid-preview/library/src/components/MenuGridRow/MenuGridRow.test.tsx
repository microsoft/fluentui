import * as React from 'react';
import { MenuGridRow } from './MenuGridRow';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';

describe('MenuGridRow', () => {
  isConformant({
    Component: MenuGridRow,
    displayName: 'MenuGridRow',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // See MenuGrid.test.tsx for the rationale behind this pair of adjustments.
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for MenuGridRow in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGridRow>Default MenuGridRow</MenuGridRow>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
