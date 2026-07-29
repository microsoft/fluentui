import * as React from 'react';
import { MenuGridGroup } from './MenuGridGroup';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';

describe('MenuGridGroup', () => {
  isConformant({
    Component: MenuGridGroup,
    displayName: 'MenuGridGroup',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // See MenuGrid.test.tsx for the rationale behind this pair of adjustments.
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  afterEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for MenuGridGroup in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuGridGroup>Default MenuGridGroup</MenuGridGroup>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should allow user to specify their own aria-labelledby attribute', () => {
    // Arrange
    const id = 'xxx';

    // Act
    const { container } = render(<MenuGridGroup aria-labelledby={id} />);

    // Assert
    expect(container.firstElementChild?.getAttribute('aria-labelledby')).toEqual(id);
  });
});
