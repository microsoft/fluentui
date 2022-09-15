import { renderHook, act } from '@testing-library/react-hooks';
import { useSelection } from './useSelection';

describe('useSelection', () => {
  const items = [{ value: 'a' }, { value: 'b' }, { value: 'c' }, { value: 'd' }];

  const getRowId = (item: {}, index: number) => index;

  it('should use default selected state', () => {
    const { result } = renderHook(() =>
      useSelection({ selectionMode: 'multiselect', items, getRowId, defaultSelectedItems: new Set([1]) }),
    );

    expect(Array.from(result.current.selectedRows)).toEqual([1]);
  });

  it('should use user selected state', () => {
    const { result } = renderHook(() =>
      useSelection({ selectionMode: 'multiselect', items, getRowId, selectedItems: new Set([1]) }),
    );

    expect(Array.from(result.current.selectedRows)).toEqual([1]);
  });

  describe('multiselect', () => {
    it('should use custom row id', () => {
      const { result } = renderHook(() =>
        useSelection({
          selectionMode: 'multiselect',
          items,
          getRowId: (item: { value: string }) => item.value,
        }),
      );
      act(() => {
        result.current.toggleAllRows();
      });

      expect(Array.from(result.current.selectedRows)).toEqual(items.map(item => item.value));
    });

    describe('toggleAllRows', () => {
      it('should select all rows', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'multiselect', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.toggleAllRows();
        });
        expect(result.current.selectedRows.size).toBe(items.length);
        expect(Array.from(result.current.selectedRows)).toEqual(items.map((_, i) => i));
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(new Set([0, 1, 2, 3]));
      });

      it('should deselect all rows', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'multiselect', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.toggleAllRows();
        });

        act(() => {
          result.current.toggleAllRows();
        });

        expect(result.current.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set());
      });
    });
    describe('clearRows', () => {
      it('should clear selection', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'multiselect', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.toggleAllRows();
        });
        act(() => {
          result.current.clearRows();
        });

        expect(result.current.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set());
      });
    });

    describe('selectRow', () => {
      it('should select row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'multiselect', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(new Set([1]));
      });

      it('should select multiple rows', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'multiselect', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.selectRow(1);
        });

        act(() => {
          result.current.selectRow(2);
        });

        expect(result.current.selectedRows.size).toBe(2);
        expect(result.current.selectedRows.has(1)).toBe(true);
        expect(result.current.selectedRows.has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set([1, 2]));
      });
    });

    describe('deselectRow', () => {
      it('should make row unselected', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'multiselect', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.selectRow(1);
        });

        act(() => {
          result.current.deselectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set());
      });
    });

    describe('toggleRow', () => {
      it('should select unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'multiselect', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.toggleRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(new Set([1]));
      });

      it('should deselect selected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'multiselect', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.toggleRow(1);
        });

        act(() => {
          result.current.toggleRow(1);
        });

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.selectedRows.has(1)).toBe(false);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set());
      });

      it('should select another unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'multiselect', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.toggleRow(1);
        });

        act(() => {
          result.current.toggleRow(2);
        });

        expect(result.current.selectedRows.size).toBe(2);
        expect(result.current.selectedRows.has(1)).toBe(true);
        expect(result.current.selectedRows.has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set([1, 2]));
      });
    });

    describe('allRowsSelected', () => {
      it('should return true if all rows are selected', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleAllRows();
        });

        expect(result.current.allRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.allRowsSelected).toBe(false);
      });

      it('should return false if not all rows are selected', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.toggleAllRows();
        });

        act(() => {
          result.current.deselectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(3);
        expect(result.current.allRowsSelected).toBe(false);
      });
    });

    describe('someRowsSelected', () => {
      it('should return true if there is a selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.someRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect', items, getRowId }));

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.someRowsSelected).toBe(false);
      });
    });
  });

  describe('single select', () => {
    describe('toggleAllRows', () => {
      it('should throw when not in production', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'single', items, getRowId, onSelectionChange }),
        );

        expect(result.current.toggleAllRows).toThrowErrorMatchingInlineSnapshot(
          `"[react-table]: \`toggleAllItems\` should not be used in single selection mode"`,
        );
        expect(onSelectionChange).toHaveBeenCalledTimes(0);
      });

      it('should be a noop in production', () => {
        const nodeEnv = (process.env.NODE_ENV = 'production');
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'single', items, getRowId, onSelectionChange }),
        );

        result.current.toggleAllRows;
        expect(result.current.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(0);

        process.env.NODE_ENV = nodeEnv;
      });
    });
    describe('clearRows', () => {
      it('should clear selection', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'single', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.selectRow(1);
        });
        act(() => {
          result.current.clearRows();
        });

        expect(result.current.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set());
      });
    });

    describe('selectRow', () => {
      it('should select row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'single', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(new Set([1]));
      });

      it('should select another row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'single', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.selectRow(1);
        });

        act(() => {
          result.current.selectRow(2);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set([2]));
      });
    });

    describe('deselectRow', () => {
      it('should make row unselected', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'single', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.selectRow(1);
        });

        act(() => {
          result.current.deselectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(0);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set());
      });
    });

    describe('toggleRow', () => {
      it('should select unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'single', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.toggleRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(1)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(1);
        expect(onSelectionChange).toHaveBeenCalledWith(new Set([1]));
      });

      it('should deselect selected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'single', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.toggleRow(1);
        });

        act(() => {
          result.current.toggleRow(2);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(1)).toBe(false);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set([2]));
      });

      it('should select another unselected row', () => {
        const onSelectionChange = jest.fn();
        const { result } = renderHook(() =>
          useSelection({ selectionMode: 'single', items, getRowId, onSelectionChange }),
        );

        act(() => {
          result.current.toggleRow(1);
        });

        act(() => {
          result.current.toggleRow(2);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.selectedRows.has(1)).toBe(false);
        expect(result.current.selectedRows.has(2)).toBe(true);
        expect(onSelectionChange).toHaveBeenCalledTimes(2);
        expect(onSelectionChange).toHaveBeenNthCalledWith(2, new Set([2]));
      });
    });

    describe('allRowsSelected', () => {
      it('should return true if there is a selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.allRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.allRowsSelected).toBe(false);
      });
    });

    describe('someRowsSelected', () => {
      it('should return true if there is a selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        act(() => {
          result.current.selectRow(1);
        });

        expect(result.current.selectedRows.size).toBe(1);
        expect(result.current.someRowsSelected).toBe(true);
      });

      it('should return false if there is no selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single', items, getRowId }));

        expect(result.current.selectedRows.size).toBe(0);
        expect(result.current.someRowsSelected).toBe(false);
      });
    });
  });
});
