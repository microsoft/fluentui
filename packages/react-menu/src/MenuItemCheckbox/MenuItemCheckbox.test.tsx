import * as React from 'react';
import { render } from '@testing-library/react';
import { MenuListContext, MenuListProvider } from '../menuListContext';
import { MenuItemCheckbox } from './MenuItemCheckbox';

describe('MenuItemCheckbox', () => {
  const TestMenuListContext = (props: { children: React.ReactNode; context?: Partial<MenuListContext> }) => {
    const contextValue: MenuListContext = {
      checkedValues: {},
      onCheckedValuesChange: jest.fn(),
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
        <MenuItemCheckbox name="test" value="1" checkmark={checkmark}>
          Checkbox
        </MenuItemCheckbox>
      </TestMenuListContext>,
    );

    // Assert
    expect(getByText(checkmark)).not.toBeNull();
  });
});
