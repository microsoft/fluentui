import * as React from 'react';
import { createEvent, fireEvent, render } from '@testing-library/react';
import { MenuItemLink } from './MenuItemLink';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { mockUseMenuContext } from '../../testing/mockUseMenuContext';
import { MenuTriggerContextProvider } from '../../contexts/menuTriggerContext';

jest.mock('../../contexts/menuContext');

describe('MenuItemLink', () => {
  isConformant({
    Component: MenuItemLink,
    displayName: 'MenuItemLink',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed. `component-has-group-marker` (a default test since
    // D16.6) replaces it: it asserts the group marker IS stamped and is never
    // `classList[0]` (D16.2). The `has-static-classnames` testOptions that fed the deleted
    // test went with it.
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      // This root IS a MenuItem root — `useMenuItemStyles_unstable` stamps its marker on the
      // same element — so it legitimately carries both markers below (DECISIONS.md D16.3).
      // Declaring the whole set keeps `component-has-group-marker` running as an exact set
      // comparison, so an undeclared marker still fails, and its `classList[0]` half — the
      // D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on — is asserted here.
      'has-group-marker': {
        markers: ['group/fui-menu-item', 'group/fui-menu-item-link'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<MenuItemLink href="#">Default MenuItemLink</MenuItemLink>);
    expect(result.container).toMatchSnapshot();
  });

  it('should swallow click events is `disabled` prop is set', () => {
    // Arrange
    const spy = jest.fn();
    const { getByRole } = render(
      <MenuItemLink disabled onClick={spy} href={''}>
        Item
      </MenuItemLink>,
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
      <MenuItemLink disabled onClick={spy} href={''}>
        Item
      </MenuItemLink>,
    );

    // Act
    fireEvent.keyDown(getByRole('menuitem'), { key });

    // Assert
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should dismiss on click', () => {
    // Arrange
    const setOpen = jest.fn();
    mockUseMenuContext({ setOpen });
    const { getByRole } = render(<MenuItemLink href={''}>Item</MenuItemLink>);

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
    const { getByRole } = render(<MenuItemLink href={''}>Item</MenuItemLink>);

    // Act
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(setOpen).toHaveBeenCalledTimes(0);
  });

  it('should not keyboard click for a default prevented event', () => {
    // Arrange
    mockUseMenuContext();
    const onClick = jest.fn();
    const { getByRole } = render(
      <MenuItemLink onClick={onClick} href={''}>
        Item
      </MenuItemLink>,
    );

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
        <MenuItemLink href={''}>Item</MenuItemLink>
      </MenuTriggerContextProvider>,
    );

    // Act
    fireEvent.click(getByRole('menuitem'));

    // Assert
    expect(setOpen).toHaveBeenCalledTimes(0);
  });
});
