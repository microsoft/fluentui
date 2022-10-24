import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { Menu } from './Menu';
import { render, fireEvent } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { MenuTrigger } from '../MenuTrigger/index';
import { MenuList } from '../MenuList/index';
import { MenuItem } from '../MenuItem/index';
import { MenuItemCheckbox } from '../MenuItemCheckbox/index';
import { MenuItemRadio } from '../MenuItemRadio/index';
import { MenuPopover } from '../MenuPopover/index';

describe('Menu', () => {
  isConformant({
    disabledTests: [
      // Menu does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // Menu does not have own styles
      'make-styles-overrides-win',
    ],
    Component: Menu,
    displayName: 'Menu',
    requiredProps: {
      children: [
        <MenuTrigger disableButtonEnhancement key="trigger">
          <button>MenuTrigger</button>
        </MenuTrigger>,
        <MenuPopover key="popover">
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>,
      ],
    },
  });

  beforeEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for Menu in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(container).toMatchSnapshot();
  });

  it.each([true, false])('should call onOpenChange when the menu is controlled with open: %s', open => {
    // Arrange
    const onOpenChange = jest.fn();
    const { getByRole } = render(
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));

    // Assert
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(expect.anything(), { open: !open, keyboard: false });
  });

  it('should call onOpenChange when menu is opened and closed', () => {
    // Arrange
    const onOpenChange = jest.fn();
    const { getByRole } = render(
      <Menu onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(onOpenChange).toHaveBeenNthCalledWith(1, expect.anything(), { open: true, keyboard: false });
    expect(onOpenChange).toHaveBeenNthCalledWith(2, expect.anything(), { open: false, keyboard: false, bubble: true });
  });

  it.each([
    ['menuitem', MenuItem, {}],
    ['menuitemcheckbox', MenuItemCheckbox, { name: 'test', value: 'test' }],
    ['menuitemradio', MenuItemRadio, { name: 'test', value: 'test' }],
  ])('should not close menu after clicking on a disabled %s', (role, MenuItemComponent, props) => {
    // Arrange
    const { getByRole } = render(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {/* eslint-disable-next-line @fluentui/max-len */}
            {/* @ts-expect-error - MenuItemComponent is union of 3 non-matching interfaces. Unnecessary narrowing logic would be needed which is out of scope for what is being tested  */}
            <MenuItemComponent disabled {...props}>
              Item
            </MenuItemComponent>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole(role));

    // Assert
    getByRole(role);
  });

  // THIRD ONE
  it.each([
    ['menuitemcheckbox', MenuItemCheckbox],
    ['menuitemradio', MenuItemRadio],
  ])('should toggle selection after clicking on %s', (role, MenuItemComponent) => {
    // Arrange
    const { getByRole } = render(
      <Menu open>
        <MenuTrigger disableButtonEnhancement>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemComponent name="test" value="test">
              Item
            </MenuItemComponent>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole(role));

    // Assert
    expect(getByRole(role).getAttribute('aria-checked')).toEqual('true');
  });

  it.each([
    ['menuitemcheckbox', MenuItemCheckbox],
    ['menuitemradio', MenuItemRadio],
  ])('should not toggle selection after clicking on disabled %s', (role, MenuItemComponent) => {
    // Arrange
    const { getByRole } = render(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemComponent name="test" value="test" disabled>
              Item
            </MenuItemComponent>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole(role));

    // Assert
    expect(getByRole(role).getAttribute('aria-checked')).toEqual('false');
  });

  it('should persist selection after popup close', () => {
    // Arrange
    const { getByRole } = render(
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox name="test" value="1">
              Item
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button')); // open menu
    fireEvent.click(getByRole('menuitemcheckbox'));
    fireEvent.click(getByRole('button')); // close menu
    fireEvent.click(getByRole('button')); // open menu

    // Assert
    expect(getByRole('menuitemcheckbox').getAttribute('aria-checked')).toEqual('true');
  });

  it('should render menu on document.body', () => {
    // Arrange
    const { container } = render(
      <Menu open>
        <MenuTrigger disableButtonEnhancement>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Assert
    expect(container.querySelector('[role="menu"]')).toBeNull();
    expect(document.body.querySelector('[role="menu"]')).not.toBeNull();
  });

  it('should render menu inline when configured by prop', () => {
    // Arrange
    const { container } = render(
      <Menu open inline>
        <MenuTrigger disableButtonEnhancement>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Assert
    expect(container.querySelector('[role="menu"]')).not.toBeNull();
  });
});
