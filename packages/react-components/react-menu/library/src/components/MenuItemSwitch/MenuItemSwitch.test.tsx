import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { isConformant } from '../../testing/isConformant';
import { MenuItemSwitch } from './MenuItemSwitch';
import { MenuItemSwitchProps } from './MenuItemSwitch.types';
import { MenuListContextValue, MenuListProvider } from '../../contexts/menuListContext';
import { mockUseMenuContext } from '../../testing/mockUseMenuContext';

jest.mock('../../contexts/menuContext');

describe('MenuItemSwitch', () => {
  isConformant<MenuItemSwitchProps>({
    Component: MenuItemSwitch,
    requiredProps: {
      name: 'checkbox',
      value: '1',
    },
    displayName: 'MenuItemSwitch',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            content: 'Test Content',
            secondaryContent: 'Test Secondary Content',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <MenuItemSwitch name="foo" value="foo">
        Default MenuItemSwitch
      </MenuItemSwitch>,
    );
    expect(result.container).toMatchSnapshot();
  });

  const TestMenuListContextProvider = (props: {
    children: React.ReactNode;
    context?: Partial<MenuListContextValue>;
  }) => {
    ``;
    const contextValue: MenuListContextValue = {
      checkedValues: {},
      toggleCheckbox: jest.fn(),
      ...(props.context && props.context),
    };

    return <MenuListProvider value={contextValue}>{props.children}</MenuListProvider>;
  };

  it('should set aria-checked value to true if value is checked', () => {
    // Arrange
    const checkedValues = { test: ['1'] };
    const { getByRole } = render(
      <TestMenuListContextProvider context={{ checkedValues }}>
        <MenuItemSwitch name="test" value="1">
          Checkbox
        </MenuItemSwitch>
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
        <MenuItemSwitch name={checkboxName} value={'1'}>
          Checkbox
        </MenuItemSwitch>
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
        <MenuItemSwitch name="test" value={'1'}>
          Checkbox
        </MenuItemSwitch>
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
      <MenuItemSwitch name="test" value="test">
        Item
      </MenuItemSwitch>,
    );

    // Act
    fireEvent.click(getByRole('menuitemcheckbox'));

    // Assert
    expect(setOpen).toHaveBeenCalledTimes(0);
  });
});
