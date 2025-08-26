import * as React from 'react';
import { MenuList } from './MenuList';
import { render } from '@testing-library/react';
import { useHasParentContext } from '@fluentui/react-context-selector';
import { isConformant } from '../../testing/isConformant';
import { MenuListContext } from '../../contexts/menuListContext';

describe('MenuList', () => {
  isConformant({
    Component: MenuList,
    displayName: 'MenuList',
    disabledTests: [
      // MenuTrigger does not have own styles
      'make-styles-overrides-win',
    ],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onCheckedValueChange'],
      },
    },
  });

  /**
   * Note: see more visual regression tests for MenuList in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuList>Default MenuList</MenuList>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('set hasMenuListContext to true', () => {
    // Arrange
    let hasMenuListContext: boolean | undefined = false;
    const TestComponent = () => {
      hasMenuListContext = useHasParentContext(MenuListContext);
      return null;
    };

    // Act
    render(
      <MenuList>
        <TestComponent />
      </MenuList>,
    );

    // Assert
    expect(hasMenuListContext).toBe(true);
  });
});
