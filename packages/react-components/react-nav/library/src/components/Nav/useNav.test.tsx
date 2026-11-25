import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useNav_unstable } from './useNav';

describe('useNav_unstable', () => {
  it('initializes only the first defaultOpenCategories entry when multiple is false', () => {
    const { result } = renderHook(() =>
      useNav_unstable({ defaultOpenCategories: ['category-1', 'category-2'], multiple: false }, React.createRef()),
    );

    expect(result.current.openCategories).toEqual(['category-1']);
  });

  it('updates selected values and calls onNavItemSelect from onSelect', () => {
    const onNavItemSelect = jest.fn();

    const { result } = renderHook(() => useNav_unstable({ onNavItemSelect }, React.createRef()));

    act(() => {
      result.current.onSelect({} as React.MouseEvent<HTMLButtonElement>, {
        type: 'click',
        event: {} as React.MouseEvent<HTMLButtonElement>,
        value: 'item-1',
        categoryValue: 'category-1',
      });
    });

    expect(result.current.selectedValue).toBe('item-1');
    expect(result.current.selectedCategoryValue).toBe('category-1');
    expect(onNavItemSelect).toHaveBeenCalledTimes(1);
  });

  it('toggles open categories through onRequestNavCategoryItemToggle', () => {
    const { result } = renderHook(() =>
      useNav_unstable({ defaultOpenCategories: ['category-1'], multiple: true }, React.createRef()),
    );

    act(() => {
      result.current.onRequestNavCategoryItemToggle({} as React.MouseEvent<HTMLButtonElement>, {
        type: 'click',
        event: {} as React.MouseEvent<HTMLButtonElement>,
        value: '',
        categoryValue: 'category-1',
      });
    });

    expect(result.current.openCategories).toEqual([]);

    act(() => {
      result.current.onRequestNavCategoryItemToggle({} as React.MouseEvent<HTMLButtonElement>, {
        type: 'click',
        event: {} as React.MouseEvent<HTMLButtonElement>,
        value: '',
        categoryValue: 'category-2',
      });
    });

    expect(result.current.openCategories).toEqual(['category-2']);
  });

  it('tracks previous selected value in getRegisteredNavItems', () => {
    const { result, rerender } = renderHook(
      ({ selectedValue }) => useNav_unstable({ selectedValue }, React.createRef()),
      { initialProps: { selectedValue: 'item-1' } },
    );

    rerender({ selectedValue: 'item-2' });

    expect(result.current.getRegisteredNavItems()).toEqual(
      expect.objectContaining({
        selectedValue: 'item-2',
        previousSelectedValue: 'item-1',
      }),
    );
  });
});
