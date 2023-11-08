import { renderHook, act } from '@testing-library/react-hooks';
import { useSelection } from './useSelection';
import { mockSyntheticEvent } from '../testing/mockSyntheticEvent';
describe('useSelection', () => {
  describe('multi select', () => {
    describe('.toggleItem', () => {
      it('should select unselected item', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', onSelectionChange }));
        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 1);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([1]) });
      });
      it('should deselect selected item', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', onSelectionChange }));

        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 1);
        });

        expect(result.current[0].size).toBe(0);
        expect(result.current[0].has(1)).toBe(false);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), { selectedItems: new Set([1]) });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
      it('should select another unselected item', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', onSelectionChange }));

        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 2);
        });

        expect(result.current[0].size).toBe(2);
        expect(result.current[0].has(1)).toBe(true);
        expect(result.current[0].has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), { selectedItems: new Set([1]) });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([1, 2]) });
      });
    });
    describe('.selectItem', () => {
      it('should select item', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', onSelectionChange }));

        act(() => {
          result.current[1].selectItem(mockSyntheticEvent(), 1);
        });

        expect(result.current[0].has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([1]) });
      });
      it('should select multiple items', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', onSelectionChange }));

        act(() => {
          result.current[1].selectItem(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current[1].selectItem(mockSyntheticEvent(), 2);
        });

        expect(result.current[0].size).toBe(2);
        expect(result.current[0].has(1)).toBe(true);
        expect(result.current[0].has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), { selectedItems: new Set([1]) });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([1, 2]) });
      });
    });
    describe('.deselectItem', () => {
      it('should make item unselected', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', onSelectionChange }));

        act(() => {
          result.current[1].selectItem(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current[1].deselectItem(mockSyntheticEvent(), 1);
        });

        expect(result.current[0].size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), { selectedItems: new Set([1]) });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });
    describe('.clearItems', () => {
      it('should clear selection', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', onSelectionChange }));

        act(() => {
          result.current[1].toggleAllItems(mockSyntheticEvent(), [1, 2, 3]);
        });
        act(() => {
          result.current[1].clearItems(mockSyntheticEvent());
        });

        expect(result.current[0].size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), {
          selectedItems: new Set([1, 2, 3]),
        });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });
    describe('.toggleAllItems', () => {
      const items = [0, 1, 2, 3];
      it('should select all items', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', onSelectionChange }));

        act(() => {
          result.current[1].toggleAllItems(mockSyntheticEvent(), items);
        });
        expect(result.current[0].size).toBe(items.length);
        expect(Array.from(result.current[0])).toEqual(items.map((_, i) => i));
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([0, 1, 2, 3]) });
      });
      it('should deselect all items', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', onSelectionChange }));

        act(() => {
          result.current[1].toggleAllItems(mockSyntheticEvent(), items);
        });

        act(() => {
          result.current[1].toggleAllItems(mockSyntheticEvent(), items);
        });
        expect(result.current[0].size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), {
          selectedItems: new Set([0, 1, 2, 3]),
        });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });
  });
  describe('single select', () => {
    describe('.toggleItem', () => {
      it('should select unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', onSelectionChange }));

        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 1);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([1]) });
      });

      it('should deselect selected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', onSelectionChange }));

        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 2);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(false);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), { selectedItems: new Set([1]) });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([2]) });
      });

      it('should select another unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', onSelectionChange }));

        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current[1].toggleItem(mockSyntheticEvent(), 2);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(false);
        expect(result.current[0].has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), { selectedItems: new Set([1]) });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([2]) });
      });
    });
    describe('.selectItem', () => {
      it('should select item', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', onSelectionChange }));

        act(() => {
          result.current[1].selectItem(mockSyntheticEvent(), 1);
        });

        expect(result.current[0].has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([1]) });
      });

      it('should select another item', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', onSelectionChange }));

        act(() => {
          result.current[1].selectItem(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current[1].selectItem(mockSyntheticEvent(), 2);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), { selectedItems: new Set([1]) });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([2]) });
      });
    });
    describe('.deselectItem', () => {
      it('should make item unselected', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', onSelectionChange }));

        act(() => {
          result.current[1].selectItem(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current[1].deselectItem(mockSyntheticEvent(), 1);
        });

        expect(result.current[0].size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), { selectedItems: new Set([1]) });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });
    describe('.clearItems', () => {
      it('should clear selection', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', onSelectionChange }));

        act(() => {
          result.current[1].selectItem(mockSyntheticEvent(), 1);
        });
        act(() => {
          result.current[1].clearItems(mockSyntheticEvent());
        });

        expect(result.current[0].size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(1, mockSyntheticEvent(), { selectedItems: new Set([1]) });
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });
    describe('.toggleAllItems', () => {
      it('should throw when not in production', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', onSelectionChange }));

        expect(result.current[1].toggleAllItems).toThrowErrorMatchingInlineSnapshot(
          `"[react-utilities]: \`toggleAllItems\` should not be used in single selection mode"`,
        );
        expect(onSelectionChange).toHaveBeenCalledTimes(0);
      });
    });
  });
});
