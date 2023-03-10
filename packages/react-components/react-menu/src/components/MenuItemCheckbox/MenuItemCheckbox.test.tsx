import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { render, fireEvent } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MenuItemCheckbox } from './MenuItemCheckbox';
import { MenuListProvider } from '../../contexts/menuListContext';
import { mockUseMenuContext } from '../../testing/mockUseMenuContext';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';

jest.mock('../../contexts/menuContext');

describe('MenuItemCheckbox conformance', () => {
  isConformant<MenuItemCheckboxProps>({
    Component: MenuItemCheckbox,
    requiredProps: {
      name: 'checkbox',
      value: '1',
    },
    displayName: 'MenuItemCheckbox',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            checkmark: 'Test Checkmark',
            submenuIndicator: 'Test Submenu Indicator',
            content: 'Test Content',
            secondaryContent: 'Test Secondary Content',
          },
        },
      ],
    },
  });

  /**
   * Note: see more visual regression tests for MenuItemCheckbox in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <MenuItemCheckbox name="checkbox" value="1">
        Default MenuItemCheckbox
      </MenuItemCheckbox>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('MenuItemCheckbox', () => {
  const TestMenuListContextProvider = (props: {
    children: React.ReactNode;
    context?: Partial<MenuListContextValue>;
  }) => {
    const contextValue: MenuListContextValue = {
      checkedValues: {},
      toggleCheckbox: jest.fn(),
      ...(props.context && props.context),
    };

    return <MenuListProvider value={contextValue}>{props.children}</MenuListProvider>;
  };

  it('should render checkmark slot if checked', () => {
    // Arrange
    const checkedValues = { test: ['1'] };
    const checkmark = 'xxx';
    const { getByText } = render(
      <TestMenuListContextProvider context={{ checkedValues }}>
        <MenuItemCheckbox name="test" value="1" checkmark={checkmark}>
          Checkbox
        </MenuItemCheckbox>
      </TestMenuListContextProvider>,
    );

    // Assert
    expect(getByText(checkmark)).not.toBeNull();
  });

  it('should render icon slot', () => {
    // Arrange
    const icon = 'xxx';
    const { getByText } = render(
      <TestMenuListContextProvider>
        <MenuItemCheckbox name="test" value="1" icon={icon}>
          Checkbox
        </MenuItemCheckbox>
      </TestMenuListContextProvider>,
    );

    // Assert
    expect(getByText(icon)).not.toBeNull();
  });

  it('should set aria-checked value to true if value is checked', () => {
    // Arrange
    const checkedValues = { test: ['1'] };
    const checkmark = 'xxx';
    const { getByRole } = render(
      <TestMenuListContextProvider context={{ checkedValues }}>
        <MenuItemCheckbox name="test" value="1" checkmark={checkmark}>
          Checkbox
        </MenuItemCheckbox>
      </TestMenuListContextProvider>,
    );

    // Assert
    expect(getByRole('menuitemcheckbox').getAttribute('aria-checked')).toEqual('true');
  });

  it.each([
    ['unchecked', ['1'], true],
    ['checked', [], false],
  ])('should call toggleCheckbox handler on click with %s state', (_, checkedItems, expectedCheckedState) => {
    // Arrange
    const checkboxName = 'name';
    const checkedValues = { [checkboxName]: checkedItems };
    const spy = jest.fn();
    const { getByRole } = render(
      <TestMenuListContextProvider context={{ checkedValues, toggleCheckbox: spy }}>
        <MenuItemCheckbox name={checkboxName} value={'1'}>
          Checkbox
        </MenuItemCheckbox>
      </TestMenuListContextProvider>,
    );

    // Act
    fireEvent.click(getByRole('menuitemcheckbox'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), checkboxName, '1', expectedCheckedState);
  });

  it.each([[Enter], [Space]])('should call toggleCheckbox with %s key', key => {
    // Arrange
    const spy = jest.fn();
    const { getByRole } = render(
      <TestMenuListContextProvider context={{ toggleCheckbox: spy }}>
        <MenuItemCheckbox name="test" value={'1'}>
          Checkbox
        </MenuItemCheckbox>
      </TestMenuListContextProvider>,
    );

    // Act
    fireEvent.keyDown(getByRole('menuitemcheckbox'), { key });
    fireEvent.keyUp(getByRole('menuitemcheckbox'), { key });

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not call setOpen by default', () => {
    // Arrange
    const setOpen = jest.fn();
    mockUseMenuContext({ setOpen });
    const { getByRole } = render(
      <MenuItemCheckbox name="test" value="test">
        Item
      </MenuItemCheckbox>,
    );

    // Act
    fireEvent.click(getByRole('menuitemcheckbox'));

    // Assert
    expect(setOpen).toHaveBeenCalledTimes(0);
  });

  it('should merge checkmark slot props', () => {
    // Arrange
    const className = 'foo';
    const { container } = render(
      <MenuItemCheckbox checkmark={{ className }} name="test" value="test">
        Item
      </MenuItemCheckbox>,
    );

    // Assert
    const slot = container.querySelector(`.${className}`);
    expect(slot).not.toBeNull();
    expect(slot?.querySelector('svg')).not.toBeNull();
  });
});
