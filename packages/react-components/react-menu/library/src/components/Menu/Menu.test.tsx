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
import { MenuOpenChangeData } from './Menu.types';

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
      // TODO:
      // onOpenChange: A second (data) argument cannot be a union
      'consistent-callback-args',
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
    expect(onOpenChange).toHaveBeenLastCalledWith(expect.anything(), {
      open: !open,
      keyboard: false,
      type: 'menuTriggerClick',
      event: expect.anything(),
    } as MenuOpenChangeData);
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
    expect(onOpenChange).toHaveBeenNthCalledWith(1, expect.anything(), {
      open: true,
      keyboard: false,
      type: 'menuTriggerClick',
      event: expect.anything(),
    });
    expect(onOpenChange).toHaveBeenNthCalledWith(2, expect.anything(), {
      open: false,
      keyboard: false,
      bubble: true,
      type: 'menuItemClick',
      event: expect.anything(),
    });
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

  it('should call onCheckedValueChange when item is selected', () => {
    const onCheckedValueChange = jest.fn();
    const { getAllByRole } = render(
      <Menu open inline onCheckedValueChange={onCheckedValueChange}>
        <MenuTrigger disableButtonEnhancement>
          <button>MenuTrigger</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox name="test" value="first">
              First
            </MenuItemCheckbox>
            <MenuItemCheckbox name="test" value="second">
              Second
            </MenuItemCheckbox>
            <MenuItemCheckbox name="test" value="third">
              Third
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    const checkboxes = getAllByRole('menuitemcheckbox');
    fireEvent.click(checkboxes[0]);
    expect(onCheckedValueChange).toHaveBeenCalledTimes(1);
  });

  it('should control checked items with checkedValues prop', () => {
    const { container } = render(
      <Menu open inline checkedValues={{ test: ['second'] }}>
        <MenuTrigger disableButtonEnhancement>
          <button>MenuTrigger</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox id="first" name="test" value="first">
              First
            </MenuItemCheckbox>
            <MenuItemCheckbox id="second" name="test" value="second">
              Second
            </MenuItemCheckbox>
            <MenuItemCheckbox id="third" name="test" value="third">
              Third
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(container.querySelector('#first')?.getAttribute('aria-checked')).toBe('false');
    expect(container.querySelector('#second')?.getAttribute('aria-checked')).toBe('true');
    expect(container.querySelector('#third')?.getAttribute('aria-checked')).toBe('false');
  });

  it('should call onCheckedValueChange (applied to MenuList) when item is selected', () => {
    const onCheckedValueChange = jest.fn();
    const { getAllByRole } = render(
      <Menu open inline>
        <MenuTrigger disableButtonEnhancement>
          <button>MenuTrigger</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList onCheckedValueChange={onCheckedValueChange}>
            <MenuItemCheckbox name="test" value="first">
              First
            </MenuItemCheckbox>
            <MenuItemCheckbox name="test" value="second">
              Second
            </MenuItemCheckbox>
            <MenuItemCheckbox name="test" value="third">
              Third
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    const checkboxes = getAllByRole('menuitemcheckbox');
    fireEvent.click(checkboxes[0]);
    expect(onCheckedValueChange).toHaveBeenCalledTimes(1);
  });

  it('should control checked items with checkedValues prop (applied to MenuList)', () => {
    const { container } = render(
      <Menu open inline>
        <MenuTrigger disableButtonEnhancement>
          <button>MenuTrigger</button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList checkedValues={{ test: ['second'] }}>
            <MenuItemCheckbox id="first" name="test" value="first">
              First
            </MenuItemCheckbox>
            <MenuItemCheckbox id="second" name="test" value="second">
              Second
            </MenuItemCheckbox>
            <MenuItemCheckbox id="third" name="test" value="third">
              Third
            </MenuItemCheckbox>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    expect(container.querySelector('#first')?.getAttribute('aria-checked')).toBe('false');
    expect(container.querySelector('#second')?.getAttribute('aria-checked')).toBe('true');
    expect(container.querySelector('#third')?.getAttribute('aria-checked')).toBe('false');
  });
});
