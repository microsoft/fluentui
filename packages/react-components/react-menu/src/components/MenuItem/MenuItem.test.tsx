import * as React from 'react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { MenuItem } from './MenuItem';
import * as renderer from 'react-test-renderer';
import { isConformant } from '../../testing/isConformant';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import { MenuListProvider } from '../../contexts/menuListContext';
import { mockUseMenuContext } from '../../testing/mockUseMenuContext';
import type { MenuItemProps } from './MenuItem.types';

jest.mock('../../contexts/menuContext');

describe('MenuItem', () => {
  isConformant<MenuItemProps>({
    Component: MenuItem,
    displayName: 'MenuItem',
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
   * Note: see more visual regression tests for MenuItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<MenuItem>Default MenuItem</MenuItem>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should focus the item on mouseenter', () => {
    // Arrange
    const { getByRole } = render(<MenuItem>Item</MenuItem>);

    // Act
    const menuitem = getByRole('menuitem');
    fireEvent.mouseEnter(menuitem);

    // Assert
    expect(document.activeElement).toBe(menuitem);
  });

  it('should render submenu indicator icon if wrapped by menu trigger context', () => {
    // Arrange
    const slot = 'submenu';
    const { getByText } = render(
      <MenuTriggerContextProvider value={true}>
        <MenuItem submenuIndicator={slot}>Item</MenuItem>
      </MenuTriggerContextProvider>,
    );

    // Assert
    getByText(slot);
  });

  it('should apply aria-disabled attribute if disabled prop is set', () => {
    // Arrange
    const { getByRole } = render(<MenuItem disabled>Item</MenuItem>);

    // Assert
    expect(getByRole('menuitem').getAttribute('aria-disabled')).toEqual('true');
  });

  it('should swallow click events is `disabled` prop is set', () => {
    // Arrange
    const spy = jest.fn();
    const { getByRole } = render(
      <MenuItem disabled onClick={spy}>
        Item
      </MenuItem>,
    );

    // Act
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it.each([Enter, Space])('should swallow %s keydown events if `disabled` prop is set', key => {
    // Arrange
    const spy = jest.fn();
    const { getByRole } = render(
      <MenuItem disabled onClick={spy}>
        Item
      </MenuItem>,
    );

    // Act
    fireEvent.keyDown(getByRole('menuitem'), { key });

    // Assert
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('Should render empty checkmark slot if hasCheckmark context value is true', () => {
    // Arrange
    const { getByRole } = render(
      <MenuListProvider value={{ hasCheckmarks: true }}>
        <MenuItem>Item</MenuItem>
      </MenuListProvider>,
    );

    // Assert
    // TODO use classname assertion once classnames are added to slots
    expect(getByRole('menuitem').querySelectorAll('span').length).toBe(2);
  });

  it('Should render empty icon slot if hasIcons context value is true', () => {
    // Arrange
    const { getByRole } = render(
      <MenuListProvider value={{ hasIcons: true }}>
        <MenuItem>Item</MenuItem>
      </MenuListProvider>,
    );

    // Assert
    // TODO use classname assertion once classnames are added to slots
    expect(getByRole('menuitem').querySelectorAll('span').length).toBe(2);
  });

  it('Should note render checkmark slot if hasCheckmark context value is false', () => {
    // Arrange
    const { getByRole } = render(
      <MenuListProvider value={{ hasCheckmarks: false }}>
        <MenuItem>Item</MenuItem>
      </MenuListProvider>,
    );

    // Assert
    // TODO use classname assertion once classnames are added to slots
    expect(getByRole('menuitem').querySelectorAll('span').length).toBe(1);
  });

  it('Should render empty icon slot if hasIcons context value is false', () => {
    // Arrange
    const { getByRole } = render(
      <MenuListProvider value={{ hasIcons: false }}>
        <MenuItem>Item</MenuItem>
      </MenuListProvider>,
    );

    // Assert
    // TODO use classname assertion once classnames are added to slots
    expect(getByRole('menuitem').querySelectorAll('span').length).toBe(1);
  });

  it('should not select text on double click', () => {
    // Arrange
    const { getByRole } = render(<MenuItem>Item</MenuItem>);

    // Assert
    // `toHaveStyle` has a bug that doesn't return actual value but assertion should be correct
    expect(getByRole('menuitem')).toHaveStyle({ userSelect: 'none' });
  });

  it('should dismiss on click', () => {
    // Arrange
    const setOpen = jest.fn();
    mockUseMenuContext({ setOpen });
    const { getByRole } = render(<MenuItem>Item</MenuItem>);

    // Act
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(setOpen).toHaveBeenCalledTimes(1);
    expect(setOpen).toHaveBeenCalledWith(expect.anything(), {
      open: false,
      bubble: true,
      keyboard: false,
      type: 'menuItemClick',
      event: expect.anything(),
    });
  });

  it('should not call setOpen if persistOnItemClick is true in context', () => {
    // Arrange
    const setOpen = jest.fn();
    mockUseMenuContext({ setOpen, persistOnItemClick: true });
    const { getByRole } = render(<MenuItem>Item</MenuItem>);

    // Act
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(setOpen).toHaveBeenCalledTimes(0);
  });

  it('should not call setOpen if persistOnClick prop is true', () => {
    // Arrange
    const setOpen = jest.fn();
    mockUseMenuContext({ setOpen });
    const { getByRole } = render(<MenuItem persistOnClick>Item</MenuItem>);

    // Act
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(setOpen).toHaveBeenCalledTimes(0);
  });

  it('should not keyboard click for a default prevented event', () => {
    // Arrange
    mockUseMenuContext();
    const onClick = jest.fn();
    const { getByRole } = render(<MenuItem onClick={onClick}>Item</MenuItem>);

    // Act
    const event = createEvent.keyDown(getByRole('menuitem'), { key: Enter });
    event.preventDefault();
    fireEvent(getByRole('menuitem'), event);

    // Assert
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should not call setOpen if the menu item controls a submenu', () => {
    // Arrange
    const setOpen = jest.fn();
    mockUseMenuContext({ setOpen });
    const { getByRole } = render(
      <MenuTriggerContextProvider value={true}>
        <MenuItem>Item</MenuItem>
      </MenuTriggerContextProvider>,
    );

    // Act
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(setOpen).toHaveBeenCalledTimes(0);
  });
});
