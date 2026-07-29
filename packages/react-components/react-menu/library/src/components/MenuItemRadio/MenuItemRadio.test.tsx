import * as React from 'react';
import { Enter, Space } from '@fluentui/keyboard-keys';
import { render, fireEvent } from '@testing-library/react';
import { MenuItemRadio } from './MenuItemRadio';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { MenuListProvider } from '../../contexts/menuListContext';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { MenuItemRadioProps } from './MenuItemRadio.types';

describe('MenuItemRadio', () => {
  isConformant<MenuItemRadioProps>({
    Component: MenuItemRadio,
    requiredProps: {
      name: 'radio',
      value: '1',
    },
    displayName: 'MenuItemRadio',
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
    testOptions: {
      // This root IS a MenuItem root — `useMenuItemStyles_unstable` stamps its marker on the
      // same element — so it legitimately carries both markers below (DECISIONS.md D16.3).
      // Declaring the whole set keeps `component-has-group-marker` running as an exact set
      // comparison, so an undeclared marker still fails, and its `classList[0]` half — the
      // D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on — is asserted here.
      'has-group-marker': {
        markers: ['group/fui-menu-item', 'group/fui-menu-item-radio'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  /**
   * Note: see more visual regression tests for MenuItemRadio in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const { container } = render(
      <MenuItemRadio name="radio" value="1">
        Default MenuItemRadio
      </MenuItemRadio>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('MenuItemRadio', () => {
  const TestMenuListContextProvider = (props: {
    children: React.ReactNode;
    context?: Partial<MenuListContextValue>;
  }) => {
    const contextValue: MenuListContextValue = {
      checkedValues: {},
      selectRadio: jest.fn(),
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
        <MenuItemRadio name="test" value="1" checkmark={checkmark}>
          Radio
        </MenuItemRadio>
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
        <MenuItemRadio name="test" value="1" icon={icon}>
          Radio
        </MenuItemRadio>
      </TestMenuListContextProvider>,
    );

    // Assert
    expect(getByText(icon)).not.toBeNull();
  });

  it('should set aria-checked value to true if value is checked', () => {
    // Arrange
    const checkedValues = { test: ['1'] };
    const { getByRole } = render(
      <TestMenuListContextProvider context={{ checkedValues }}>
        <MenuItemRadio name="test" value="1">
          Radio
        </MenuItemRadio>
      </TestMenuListContextProvider>,
    );

    // Assert
    expect(getByRole('menuitemradio').getAttribute('aria-checked')).toEqual('true');
  });

  it('should selectRadio handler on click', () => {
    // Arrange
    const radioName = 'name';
    const radioValue = '1';
    const checkedValues = { [radioName]: [] };
    const spy = jest.fn();
    const { getByRole } = render(
      <TestMenuListContextProvider context={{ checkedValues, selectRadio: spy }}>
        <MenuItemRadio name={radioName} value={radioValue}>
          Radio
        </MenuItemRadio>
      </TestMenuListContextProvider>,
    );

    // Act
    fireEvent.click(getByRole('menuitemradio'));

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), radioName, radioValue, false);
  });

  it.each([[Enter], [Space]])('should call selectRadio with %s key', key => {
    // Arrange
    const spy = jest.fn();
    const { getByRole } = render(
      <TestMenuListContextProvider context={{ selectRadio: spy }}>
        <MenuItemRadio name="test" value={'1'}>
          Radio
        </MenuItemRadio>
      </TestMenuListContextProvider>,
    );

    // Act
    fireEvent.keyDown(getByRole('menuitemradio'), { key });
    fireEvent.keyUp(getByRole('menuitemradio'), { key });

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should merge checkmark slot props', () => {
    // Arrange
    const className = 'foo';
    const { container } = render(
      <MenuItemRadio checkmark={{ className }} name="test" value="test">
        Item
      </MenuItemRadio>,
    );

    // Assert
    const slot = container.querySelector(`.${className}`);
    expect(slot).not.toBeNull();
    expect(slot?.querySelector('svg')).not.toBeNull();
  });
});
