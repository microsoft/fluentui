import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { MenuItemCheckbox } from './MenuItemCheckbox';
import { MenuListContextValue, MenuListProvider } from '../../menuListContext';

describe('MenuItemCheckbox conformance', () => {
  isConformant({
    asPropHandlesRef: true,
    // TODO fix generics in conformance
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Component: MenuItemCheckbox,
    requiredProps: {
      name: 'checkbox',
      value: '1',
    },
    displayName: 'MenuItemCheckbox',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuItemCheckbox in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <MenuItemCheckbox name="checkbox" value="1">
        Default MenuItemCheckbox
      </MenuItemCheckbox>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
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
    const { container } = render(
      <TestMenuListContextProvider context={{ checkedValues }}>
        <MenuItemCheckbox name="test" value="1" checkmark={checkmark}>
          Checkbox
        </MenuItemCheckbox>
      </TestMenuListContextProvider>,
    );

    // Assert
    expect(container.querySelector('[role="menuitemcheckbox"]')?.getAttribute('aria-checked')).toEqual('true');
  });

  it.each([
    ['unchecked', ['1'], true],
    ['checked', [], false],
  ])('should call toggleCheckbox handler on click with %s state', (_, checkedItems, expectedCheckedState) => {
    // Arrange
    const checkboxName = 'name';
    const checkedValues = { [checkboxName]: checkedItems };
    const spy = jest.fn();
    const { container } = render(
      <TestMenuListContextProvider context={{ checkedValues, toggleCheckbox: spy }}>
        <MenuItemCheckbox name={checkboxName} value={'1'}>
          Checkbox
        </MenuItemCheckbox>
      </TestMenuListContextProvider>,
    );

    // Act
    const menuitem = container.querySelector('[role="menuitemcheckbox"]');
    menuitem && fireEvent.click(menuitem);

    // Assert
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), checkboxName, '1', expectedCheckedState);
  });
});
