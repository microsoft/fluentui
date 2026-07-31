import * as React from 'react';
import { MenuList } from './MenuList';
import { render } from '@testing-library/react';
import { useHasParentContext } from '@fluentui/react-context-selector';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MenuListContext } from '../../contexts/menuListContext';

describe('MenuList', () => {
  isConformant({
    Component: MenuList,
    displayName: 'MenuList',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed; `component-has-group-marker` (a default test since
    // D16.6) replaces it.
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onCheckedValueChange'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
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
