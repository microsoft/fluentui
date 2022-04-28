import { resetIdsForTests } from '@fluentui/react-utilities';
import * as React from 'react';
import { Escape, ArrowLeft, ArrowRight } from '@fluentui/keyboard-keys';
import { Menu } from './Menu';
import { render, fireEvent, act } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
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
      'component-has-static-classname',
      'component-has-static-classnames-object',
      'component-has-static-classname-exported',
      // Menu does not have own styles
      'make-styles-overrides-win',
    ],
    Component: Menu,
    displayName: 'Menu',
    requiredProps: {
      children: [
        <MenuTrigger key="trigger">
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

  afterEach(() => {
    resetIdsForTests();
    jest.useRealTimers();
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
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
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
    getByRole('menu');
  });

  it.each([true, false])('should call onOpenChange when the menu is controlled with open: %s', open => {
    // Arrange
    const onOpenChange = jest.fn();
    const { getByRole } = render(
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger>
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
        <MenuTrigger>
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

  it('should not menu after clicking on a disabled menuitem', () => {
    // Arrange
    const { getByRole, queryByRole } = render(
      <Menu>
        <MenuTrigger>
          <MenuItem disabled>Menu trigger</MenuItem>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(queryByRole('menu')).toBeNull();
  });

  it.each([
    ['menuitem', MenuItem, {}],
    ['menuitemradio', MenuItemRadio, { name: 'test', value: 'test' }],
  ])('should close menu after clicking on %s', (role, MenuItemComponent, props) => {
    // Arrange
    const { getByRole, queryByRole } = render(
      <Menu>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {/* eslint-disable-next-line @fluentui/max-len */}
            {/* @ts-expect-error - MenuItemComponent is union of 2 non-matching interfaces. Unnecessary narrowing logic would be needed which is out of scope for what is being tested  */}
            <MenuItemComponent {...props}>Item</MenuItemComponent>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole(role));

    // Assert
    expect(queryByRole(role)).toBeNull();
  });

  it.each([
    ['menuitem', MenuItem, {}],
    ['menuitemcheckbox', MenuItemCheckbox, { name: 'test', value: 'test' }],
    ['menuitemradio', MenuItemRadio, { name: 'test', value: 'test' }],
  ])('should not close menu after clicking on a disabled %s', (role, MenuItemComponent, props) => {
    // Arrange
    const { getByRole } = render(
      <Menu>
        <MenuTrigger>
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
        <MenuTrigger>
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
        <MenuTrigger>
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
        <MenuTrigger>
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

  it('should open nested menu with mouse move', () => {
    // Arrange
    jest.useFakeTimers();
    const expected = 'visible';
    const { getByRole, getByText } = render(
      <Menu open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
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
        </MenuPopover>
      </Menu>,
    );

    // Act
    act(() => {
      fireEvent.mouseMove(getByRole('menuitem'));
      jest.runOnlyPendingTimers();
    });

    // Assert
    getByText(expected);
  });

  it('should not open nested menu with mouseenter without mousemove', () => {
    // Arrange
    jest.useFakeTimers();
    const expected = 'hidden';
    const { getByRole, queryByText } = render(
      <Menu open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
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
        </MenuPopover>
      </Menu>,
    );

    // Act
    act(() => {
      fireEvent.mouseEnter(getByRole('menuitem'));
      jest.runOnlyPendingTimers();
    });

    // Assert
    expect(queryByText(expected)).toBeNull();
  });

  it('should not open nested menu mousemove after first mousemove event', () => {
    // Arrange
    jest.useFakeTimers();
    const expected = 'hidden';
    const { getByText, queryByText } = render(
      <Menu open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <Menu>
              <MenuTrigger>
                <MenuItem>Trigger</MenuItem>
              </MenuTrigger>
              <MenuList>
                <MenuItem>{expected}</MenuItem>
              </MenuList>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    act(() => {
      // open menu
      fireEvent.mouseMove(getByText('Trigger'));
      jest.runOnlyPendingTimers();
    });
    act(() => {
      // close menu
      fireEvent.mouseLeave(getByText('Trigger'));
      jest.runOnlyPendingTimers();
    });
    act(() => {
      // fail to open again with mouse mouve
      fireEvent.mouseMove(getByText('Trigger'));
      jest.runOnlyPendingTimers();
    });

    // Assert
    expect(queryByText(expected)).toBeNull();
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
        <MenuPopover>
          <MenuList>
            <MenuItem>{target}</MenuItem>
            <MenuItem>Item</MenuItem>
            <Menu>
              <MenuTrigger>
                <MenuItem>{trigger}</MenuItem>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>{invisible}</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.mouseEnter(getByText(trigger));
    fireEvent.mouseEnter(getByText(target));

    // Assert
    expect(queryByText(invisible)).toBeNull();
  });

  it.each([Escape, ArrowLeft])('should close open nested menu with %s key', key => {
    // Arrange
    const target = 'target';
    const trigger = 'trigger';
    const invisible = 'invisible';
    const { queryByText, getByText } = render(
      <Menu open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>{target}</MenuItem>
            <MenuItem>Item</MenuItem>
            <Menu>
              <MenuTrigger>
                <MenuItem>{trigger}</MenuItem>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>{invisible}</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.keyDown(getByText(trigger), { key: ArrowRight });
    fireEvent.keyDown(getByText(invisible), { key });

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
        <MenuPopover>
          <MenuList>
            <MenuItem>{visible}</MenuItem>
            <MenuItem>Item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.keyDown(getByText(trigger), { key: ArrowRight });
    fireEvent.keyDown(getByText(visible), { key: ArrowLeft });

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
        <MenuPopover>
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
        </MenuPopover>
      </Menu>,
    );

    // Act
    fireEvent.click(getByText(trigger));

    // Assert
    getByText(visible);
  });

  it('should render menu on document.body', () => {
    // Arrange
    const { container } = render(
      <Menu open>
        <MenuTrigger>
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
        <MenuTrigger>
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

  it('should render submenus to the same DOM node as root', () => {
    // Arrange
    const outer = 'outer';
    const inner = 'inner';
    const { getByTestId } = render(
      <Menu open>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList data-testid={outer}>
            <MenuItem>Item</MenuItem>
            <Menu open>
              <MenuTrigger>
                <MenuItem>Item</MenuItem>
              </MenuTrigger>
              <MenuList id={inner}>
                <MenuItem>Item</MenuItem>
              </MenuList>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>,
    );

    // Assert
    expect(getByTestId(outer).querySelector(`#${inner}`)).not.toBeNull();
  });
});
