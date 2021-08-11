import * as React from 'react';
import { MenuList } from './MenuList';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { render } from '@testing-library/react';
import { useHasParentContext } from '@fluentui/react-context-selector';
import { isConformant } from '../../common/isConformant';
import { MenuListContext, MenuListProvider } from '../../contexts/menuListContext';

describe('MenuList', () => {
  isConformant({
    Component: MenuList,
    displayName: 'MenuList',
    helperComponents: [MenuListProvider],
    testOptions: {
      'consistent-callback-args': { ignoreProps: ['onCheckedValueChange'] },
    },
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuList in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<MenuList>Default MenuList</MenuList>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
