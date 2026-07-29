import * as React from 'react';
import { MenuGridCell } from './MenuGridCell';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';

describe('MenuGridCell', () => {
  isConformant({
    Component: MenuGridCell,
    displayName: 'MenuGridCell',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // See MenuGrid.test.tsx for the rationale behind this pair of adjustments.
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for MenuGridCell in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGridCell>Default MenuGridCell</MenuGridCell>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
