import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { render, fireEvent } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
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
        markers: ['group/fui-menu-item', 'group/fui-menu-item-checkbox'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for MenuItemCheckbox in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(
      <MenuItemCheckbox name="checkbox" value="1">
        Default MenuItemCheckbox
      </MenuItemCheckbox>,
    );
    expect(container.firstChild).toMatchSnapshot();
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
