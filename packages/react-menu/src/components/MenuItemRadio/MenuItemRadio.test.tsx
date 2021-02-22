import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { MenuItemRadio } from './MenuItemRadio';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { MenuListProvider, MenuListContextValue } from '../../menuListContext';

describe('MenuItemRadio', () => {
  isConformant({
    asPropHandlesRef: true,
    // TODO fix generics in conformance
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
  const TestMenuListContext = (props: { children: React.ReactNode; context?: Partial<MenuListContext> }) => {
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
      <TestMenuListContext context={{ checkedValues }}>
        <MenuItemRadio name="test" value="1" checkmark={checkmark}>
          Radio
        </MenuItemRadio>
      </TestMenuListContext>,
    );

    // Assert
    expect(getByText(checkmark)).not.toBeNull();
  });

  it('should render icon slot', () => {
    // Arrange
    const icon = 'xxx';
    const { getByText } = render(
      <TestMenuListContext>
        <MenuItemRadio name="test" value="1" icon={icon}>
          Radio
        </MenuItemRadio>
      </TestMenuListContext>,
    );

    // Assert
    expect(getByText(icon)).not.toBeNull();
  });

  it('should set aria-checked value to true if value is checked', () => {
    // Arrange
    const checkedValues = { test: ['1'] };
    const { container } = render(
      <TestMenuListContext context={{ checkedValues }}>
        <MenuItemRadio name="test" value="1">
          Radio
        </MenuItemRadio>
      </TestMenuListContext>,
    );

    // Assert
    expect(container.querySelector('[role="menuitemradio"]')?.getAttribute('aria-checked')).toEqual('true');
  });

  it('should selectRadio handler on click', () => {
    // Arrange
    const radioName = 'name';
    const radioValue = '1';
    const checkedValues = { [radioName]: [] };
    const spy = jest.fn();
    const { container } = render(
      <TestMenuListContext context={{ checkedValues, selectRadio: spy }}>
        <MenuItemRadio name={radioName} value={radioValue}>
          Radio
        </MenuItemRadio>
      </TestMenuListContext>,
    );

    // Act
    const menuitem = container.querySelector('[role="menuitemradio"]');
    menuitem && fireEvent.click(menuitem);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), radioName, radioValue, false);
  });
});
