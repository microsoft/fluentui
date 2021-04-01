import * as React from 'react';
import { Menu } from './Menu';
import { render, fireEvent } from '@testing-library/react';
import { ReactWrapper } from 'enzyme';
import { keyboardKey } from '@fluentui/keyboard-key';
import { isConformant } from '../../common/isConformant';
import { MenuTrigger } from '../MenuTrigger/index';
import { MenuList } from '../MenuList/index';
import { MenuItem } from '../MenuItem/index';
import { MenuProps } from './Menu.types';
import { MenuItemCheckbox } from '../MenuItemCheckbox/index';
import { MenuItemRadio } from '../MenuItemRadio/index';

describe('Menu', () => {
  isConformant({
    disabledTests: [
      'as-renders-html',
      'as-renders-fc',
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'as-passes-as-value',
    ],
    Component: Menu,
    displayName: 'Menu',
    requiredProps: {
      children: [
        <MenuTrigger key="trigger">
          <button>MenuTrigger</button>
        </MenuTrigger>,
        <MenuList key="item">
          <MenuItem>Item</MenuItem>
        </MenuList>,
      ],
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
   * Note: see more visual regression tests for Menu in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(
      <Menu>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </Menu>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should open menu by clicking on trigger', () => {
    // Arrange
    const { getByRole } = render(
      <Menu>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));

    // Assert
    getByRole('menu');
  });

  it('should not menu after clicking on a disabled menuitem', () => {
    // Arrange
    const { getByRole, queryByRole } = render(
      <Menu>
        <MenuTrigger>
          <MenuItem disabled>Menu trigger</MenuItem>
        </MenuTrigger>
        <MenuList>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(queryByRole('menu')).toBeNull();
  });

  it.each([
    ['onMouseEnter', fireEvent.mouseEnter],
    ['onMouseLeave', fireEvent.mouseLeave],
    ['onBlur', fireEvent.blur],
    ['onKeyDown', fireEvent.keyDown],
  ])('should pass original %s handler to menu popup', (handler, trigger) => {
    // Arrange
    const spy = jest.fn();
    const menuPopup: MenuProps['menuPopup'] = { [handler]: spy };
    const { getByRole } = render(
      <Menu menuPopup={menuPopup} open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </Menu>,
    );

    // Act
    trigger(getByRole('menu'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['menuitem', MenuItem],
    ['menuitemcheckbox', MenuItemCheckbox],
    ['menuitemradio', MenuItemRadio],
  ])('should close menu after clicking on %s', (role, MenuItemComponent) => {
    // Arrange
    const { getByRole, queryByRole } = render(
      <Menu>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItemComponent>Item</MenuItemComponent>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole(role));

    // Assert
    expect(queryByRole(role)).toBeNull();
  });

  it.each([
    ['menuitem', MenuItem],
    ['menuitemcheckbox', MenuItemCheckbox],
    ['menuitemradio', MenuItemRadio],
  ])('should not close menu after clicking on a disabled %s', (role, MenuItemComponent) => {
    // Arrange
    const { getByRole } = render(
      <Menu>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItemComponent disabled>Item</MenuItemComponent>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole(role));

    // Assert
    getByRole(role);
  });

  it.each([
    ['menuitemcheckbox', MenuItemCheckbox],
    ['menuitemradio', MenuItemRadio],
  ])('should toggle selection after clicking on %s', (role, MenuItemComponent) => {
    // Arrange
    const { getByRole } = render(
      <Menu>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItemComponent name="test" value="test">
            Item
          </MenuItemComponent>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole(role));
    fireEvent.click(getByRole('button'));

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
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItemComponent name="test" value="test" disabled>
            Item
          </MenuItemComponent>
        </MenuList>
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
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItemCheckbox name="test" value="1">
            Item
          </MenuItemCheckbox>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button')); // open menu
    fireEvent.click(getByRole('menuitemcheckbox')); // also closes menu
    fireEvent.click(getByRole('button')); // open menu

    // Assert
    expect(getByRole('menuitemcheckbox').getAttribute('aria-checked')).toEqual('true');
  });

  it('should open nested menu with mouse enter', () => {
    // Arrange
    const expected = 'visible';
    const { getByRole, getByText } = render(
      <Menu open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <Menu>
            <MenuTrigger>
              <MenuItem>Item</MenuItem>
            </MenuTrigger>
            <MenuList>
              <MenuItem>{expected}</MenuItem>
            </MenuList>
          </Menu>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.mouseEnter(getByRole('menuitem'));

    // Assert
    getByText(expected);
  });

  it('should close open nested menu when mouse enters another menuitem', () => {
    // Arrange
    const target = 'target';
    const trigger = 'trigger';
    const invisible = 'invisible';
    const { queryByText, getByText } = render(
      <Menu open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItem>{target}</MenuItem>
          <MenuItem>Item</MenuItem>
          <Menu>
            <MenuTrigger>
              <MenuItem>{trigger}</MenuItem>
            </MenuTrigger>
            <MenuList>
              <MenuItem>{invisible}</MenuItem>
            </MenuList>
          </Menu>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.mouseEnter(getByText(trigger));
    fireEvent.mouseEnter(getByText(target));

    // Assert
    expect(queryByText(invisible)).toBeNull();
  });

  it.each([keyboardKey.Escape, keyboardKey.ArrowLeft])('should close open nested menu with %s key', keyCode => {
    // Arrange
    const target = 'target';
    const trigger = 'trigger';
    const invisible = 'invisible';
    const { queryByText, getByText } = render(
      <Menu open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItem>{target}</MenuItem>
          <MenuItem>Item</MenuItem>
          <Menu>
            <MenuTrigger>
              <MenuItem>{trigger}</MenuItem>
            </MenuTrigger>
            <MenuList>
              <MenuItem>{invisible}</MenuItem>
            </MenuList>
          </Menu>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.keyDown(getByText(trigger), { keyCode: keyboardKey.ArrowRight });
    fireEvent.keyDown(getByText(invisible), { keyCode });

    // Assert
    expect(queryByText(invisible)).toBeNull();
  });

  it('should not close a root menu with left arrow', () => {
    // Arrange
    const trigger = 'trigger';
    const visible = 'visible';
    const { getByText } = render(
      <Menu open>
        <MenuTrigger>
          <button>{trigger}</button>
        </MenuTrigger>
        <MenuList>
          <MenuItem>{visible}</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.keyDown(getByText(trigger), { keyCode: keyboardKey.ArrowRight });
    fireEvent.keyDown(getByText(visible), { keyCode: keyboardKey.ArrowLeft });

    // Assert
    getByText(visible);
  });

  it('should open submenu on click', () => {
    // Arrange
    const target = 'target';
    const trigger = 'trigger';
    const visible = 'visible';
    const { getByText } = render(
      <Menu open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItem>{target}</MenuItem>
          <MenuItem>Item</MenuItem>
          <Menu>
            <MenuTrigger>
              <MenuItem>{trigger}</MenuItem>
            </MenuTrigger>
            <MenuList>
              <MenuItem>{visible}</MenuItem>
            </MenuList>
          </Menu>
        </MenuList>
      </Menu>,
    );

    // Act
    fireEvent.click(getByText(trigger));

    // Assert
    getByText(visible);
  });
});
