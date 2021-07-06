import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { EnterKey, SpacebarKey } from '@fluentui/keyboard-key';
import { render, fireEvent } from '@testing-library/react';
import { MenuItemRadio } from './MenuItemRadio';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { MenuListProvider, MenuListContextValue } from '../../contexts/menuListContext';

describe('MenuItemRadio', () => {
  isConformant({
    Component: MenuItemRadio,
    requiredProps: {
      name: 'radio',
      value: '1',
    },
    displayName: 'MenuItemRadio',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuItemRadio in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <MenuItemRadio name="radio" value="1">
        Default MenuItemRadio
      </MenuItemRadio>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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

  it.each([[EnterKey], [SpacebarKey]])('should call selectRadio with %s key', keyCode => {
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
    fireEvent.keyDown(getByRole('menuitemradio'), { keyCode });
    fireEvent.keyUp(getByRole('menuitemradio'), { keyCode });

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
