import * as React from 'react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { MenuItem } from './MenuItem';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';
import { MenuListProvider } from '../../contexts/menuListContext';
import { mockUseMenuContext } from '../../testing/mockUseMenuContext';
import type { MenuItemProps } from './MenuItem.types';

import styles from './MenuItem.module.css';

jest.mock('../../contexts/menuContext');

describe('MenuItem', () => {
  isConformant<MenuItemProps>({
    Component: MenuItem,
    displayName: 'MenuItem',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last; this component composes with clsx and
    // never calls mergeClasses, so the test can no longer observe the contract. The
    // guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement.
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed. `component-has-group-marker` (a default test since
    // D16.6) replaces it: it asserts the group marker IS stamped and is never
    // `classList[0]` (D16.2). The `has-static-classnames` testOptions that fed the deleted
    // test went with it.
    disabledTests: ['component-has-static-classnames-object', 'make-styles-overrides-win'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for MenuItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(<MenuItem>Default MenuItem</MenuItem>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should focus the item on mousemove', () => {
    // Arrange
    const { getByRole } = render(<MenuItem>Item</MenuItem>);

    // Act
    const menuitem = getByRole('menuitem');
    fireEvent.mouseMove(menuitem);

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
    //
    // This used to be `toHaveStyle({ userSelect: 'none' })`, which passed only because Griffel
    // INJECTED its atomics into jsdom at runtime. After the Griffel → Tailwind + CSS Modules
    // conversion the declaration lives in the package's compiled `dist/styles.css` and jest maps
    // `*.module.css` to a class-name proxy, so `getComputedStyle` has no stylesheet to read
    // (same call react-provider and react-text made — migration/griffel-to-tailwind/reports).
    //
    // What jest can still assert is the DOM contract: the root carries the module class that
    // declares `user-select: none` (MenuItem.module.css, `@layer fui.base .root`). The computed
    // value itself is covered by the computed-style probe against the emitted stylesheet.
    expect(getByRole('menuitem')).toHaveClass(styles.root);
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
