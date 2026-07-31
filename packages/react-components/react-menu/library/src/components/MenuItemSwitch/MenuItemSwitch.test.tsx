import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MenuItemSwitch } from './MenuItemSwitch';
import type { MenuItemSwitchProps } from './MenuItemSwitch.types';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import { MenuListProvider } from '../../contexts/menuListContext';
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
    disabledTests: ['component-has-static-classnames-object'],
    testOptions: {
      // This root IS a MenuItem root — `useMenuItemStyles_unstable` stamps its marker on the
      // same element — so it legitimately carries both markers below (DECISIONS.md D16.3).
      // Declaring the whole set keeps `component-has-group-marker` running as an exact set
      // comparison, so an undeclared marker still fails, and its `classList[0]` half — the
      // D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on — is asserted here.
      'has-group-marker': {
        markers: ['group/fui-menu-item', 'group/fui-menu-item-switch'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
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
