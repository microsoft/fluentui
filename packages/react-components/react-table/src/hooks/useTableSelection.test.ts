import { renderHook, act } from '@testing-library/react-hooks';
import { useTableSelectionState } from './useTableSelection';
import { mockTableState } from '../testing/mockTableState';
import { mockSyntheticEvent } from '../testing/mockSyntheticEvent';

describe('useTableSelectionState', () => {
  const items = [{ value: 'a' }, { value: 'b' }, { value: 'c' }, { value: 'd' }];

  it('should use default selected state', () => {
    const { result } = renderHook(() =>
      useTableSelectionState(mockTableState({ items }), {
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([1]),
      }),
    );

    expect(Array.from(result.current.selection.selectedRows)).toEqual([1]);
  });

  it('should use user selected state', () => {
    const { result } = renderHook(() =>
      useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', selectedItems: new Set([1]) }),
    );

    expect(Array.from(result.current.selection.selectedRows)).toEqual([1]);
  });

  describe('multiselect', () => {
    it('should use custom row id', () => {
      const { result } = renderHook(() =>
        useTableSelectionState(
          mockTableState({
            getRowId: (item: { value: string }) => item.value,
            items,
          }),
          {
            selectionMode: 'multiselect',
          },
        ),
      );
      act(() => {
        result.current.selection.toggleAllRows(mockSyntheticEvent());
      });

      expect(Array.from(result.current.selection.selectedRows)).toEqual(items.map(item => item.value));
    });

    describe('toggleAllRows', () => {
      it('should select all rows', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', onSelectionChange }),
        );

        act(() => {
          result.current.selection.toggleAllRows(mockSyntheticEvent());
        });
        expect(result.current.selection.selectedRows.size).toBe(items.length);
        expect(Array.from(result.current.selection.selectedRows)).toEqual(items.map((_, i) => i));
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([0, 1, 2, 3]) });
      });

      it('should deselect all rows', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', onSelectionChange }),
        );

        act(() => {
          result.current.selection.toggleAllRows(mockSyntheticEvent());
        });

        act(() => {
          result.current.selection.toggleAllRows(mockSyntheticEvent());
        });

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });
    describe('clearRows', () => {
      it('should clear selection', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', onSelectionChange }),
        );

        act(() => {
          result.current.selection.toggleAllRows(mockSyntheticEvent());
        });
        act(() => {
          result.current.selection.clearRows(mockSyntheticEvent());
        });

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });

    describe('selectRow', () => {
      it('should select row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', onSelectionChange }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([1]) });
      });

      it('should select multiple rows', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', onSelectionChange }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 2);
        });

        expect(result.current.selection.selectedRows.size).toBe(2);
        expect(result.current.selection.selectedRows.has(1)).toBe(true);
        expect(result.current.selection.selectedRows.has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([1, 2]) });
      });
    });

    describe('deselectRow', () => {
      it('should make row unselected', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', onSelectionChange }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current.selection.deselectRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });

    describe('toggleRow', () => {
      it('should select unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', onSelectionChange }),
        );

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.size).toBe(1);
        expect(result.current.selection.selectedRows.has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([1]) });
      });

      it('should deselect selected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', onSelectionChange }),
        );

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(result.current.selection.selectedRows.has(1)).toBe(false);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });

      it('should select another unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect', onSelectionChange }),
        );

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 2);
        });

        expect(result.current.selection.selectedRows.size).toBe(2);
        expect(result.current.selection.selectedRows.has(1)).toBe(true);
        expect(result.current.selection.selectedRows.has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([1, 2]) });
      });
    });

    describe('allRowsSelected', () => {
      it('should return false if there are no selectable rows', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items: [] }), { selectionMode: 'multiselect' }),
        );

        expect(result.current.selection.allRowsSelected).toBe(false);
      });

      it('should return true after items updated if all selectable rows are selected', () => {
        const getRowId = (item: { value: string }) => item.value;
        let tableState = mockTableState({ items, getRowId });
        const { result, rerender } = renderHook(() =>
          useTableSelectionState(tableState, { selectionMode: 'multiselect' }),
        );

        act(() => {
          result.current.selection.toggleAllRows(mockSyntheticEvent());
        });

        act(() => {
          result.current.selection.deselectRow(mockSyntheticEvent(), 'c');
        });

        expect(result.current.selection.allRowsSelected).toBe(false);

        // remove the deselected item
        const nextItems = [...items];
        const indexToDelete = nextItems.findIndex(x => x.value === 'c');
        nextItems.splice(indexToDelete, 1);
        tableState = mockTableState({ items: nextItems, getRowId });

        act(() => {
          rerender();
        });

        expect(result.current.selection.allRowsSelected).toBe(true);
      });

      it('should return true if all rows are selected', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect' }),
        );

        act(() => {
          result.current.selection.toggleAllRows(mockSyntheticEvent());
        });

        expect(result.current.selection.allRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect' }),
        );

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(result.current.selection.allRowsSelected).toBe(false);
      });

      it('should return false if not all rows are selected', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect' }),
        );

        act(() => {
          result.current.selection.toggleAllRows(mockSyntheticEvent());
        });

        act(() => {
          result.current.selection.deselectRow(mockSyntheticEvent(), 1);
        });
        expect(result.current.selection.selectedRows.size).toBe(3);
        expect(result.current.selection.allRowsSelected).toBe(false);
      });
    });

    describe('someRowsSelected', () => {
      it('should return false after selectedItems are removed', () => {
        const getRowId = (item: { value: string }) => item.value;
        let tableState = mockTableState({ items, getRowId });
        const { result, rerender } = renderHook(() =>
          useTableSelectionState(tableState, { selectionMode: 'multiselect' }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 'a');
        });

        expect(result.current.selection.someRowsSelected).toBe(true);

        // remove the deselected item
        const nextItems = [...items];
        const indexToDelete = nextItems.findIndex(x => x.value === 'a');
        nextItems.splice(indexToDelete, 1);
        tableState = mockTableState({ items: nextItems, getRowId });

        act(() => {
          rerender();
        });

        expect(result.current.selection.someRowsSelected).toBe(false);
      });

      it('should return true if there is a selected row', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect' }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.size).toBe(1);
        expect(result.current.selection.someRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'multiselect' }),
        );

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(result.current.selection.someRowsSelected).toBe(false);
      });
    });
  });

  describe('single select', () => {
    describe('toggleAllRows', () => {
      it('should throw when not in production', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single', onSelectionChange }),
        );

        expect(result.current.selection.toggleAllRows).toThrowErrorMatchingInlineSnapshot(
          `"[react-utilities]: \`toggleAllItems\` should not be used in single selection mode"`,
        );
        expect(onSelectionChange).toHaveBeenCalledTimes(0);
      });

      it('should be a noop in production', () => {
        const nodeEnv = (process.env.NODE_ENV = 'production');
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single', onSelectionChange }),
        );

        result.current.selection.toggleAllRows;
        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(0);

        process.env.NODE_ENV = nodeEnv;
      });
    });
    describe('clearRows', () => {
      it('should clear selection', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single', onSelectionChange }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });
        act(() => {
          result.current.selection.clearRows(mockSyntheticEvent());
        });

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });

    describe('selectRow', () => {
      it('should select row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single', onSelectionChange }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([1]) });
      });

      it('should select another row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single', onSelectionChange }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 2);
        });

        expect(result.current.selection.selectedRows.size).toBe(1);
        expect(result.current.selection.selectedRows.has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([2]) });
      });
    });

    describe('deselectRow', () => {
      it('should make row unselected', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single', onSelectionChange }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current.selection.deselectRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set() });
      });
    });

    describe('toggleRow', () => {
      it('should select unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single', onSelectionChange }),
        );

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.size).toBe(1);
        expect(result.current.selection.selectedRows.has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(mockSyntheticEvent(), { selectedItems: new Set([1]) });
      });

      it('should deselect selected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single', onSelectionChange }),
        );

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 2);
        });

        expect(result.current.selection.selectedRows.size).toBe(1);
        expect(result.current.selection.selectedRows.has(1)).toBe(false);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([2]) });
      });

      it('should select another unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single', onSelectionChange }),
        );

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 1);
        });

        act(() => {
          result.current.selection.toggleRow(mockSyntheticEvent(), 2);
        });

        expect(result.current.selection.selectedRows.size).toBe(1);
        expect(result.current.selection.selectedRows.has(1)).toBe(false);
        expect(result.current.selection.selectedRows.has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, mockSyntheticEvent(), { selectedItems: new Set([2]) });
      });
    });

    describe('allRowsSelected', () => {
      it('should return true if there is a selected row', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single' }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.size).toBe(1);
        expect(result.current.selection.allRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single' }),
        );

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(result.current.selection.allRowsSelected).toBe(false);
      });
    });

    describe('someRowsSelected', () => {
      it('should return true if there is a selected row', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single' }),
        );

        act(() => {
          result.current.selection.selectRow(mockSyntheticEvent(), 1);
        });

        expect(result.current.selection.selectedRows.size).toBe(1);
        expect(result.current.selection.someRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() =>
          useTableSelectionState(mockTableState({ items }), { selectionMode: 'single' }),
        );

        expect(result.current.selection.selectedRows.size).toBe(0);
        expect(result.current.selection.someRowsSelected).toBe(false);
      });
    });
  });
});
