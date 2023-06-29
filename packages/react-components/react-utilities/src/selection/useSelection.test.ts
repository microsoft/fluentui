import { renderHook, act } from '@testing-library/react-hooks';
import { useSelection } from './useSelection';
describe('useSelection', () => {
  describe('multi select', () => {
    describe('.toggleItem', () => {
      it('should select unselected item', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect' }));

        act(() => {
          result.current[1].toggleItem(1);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(true);
      });
      it('should deselect selected item', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect' }));

        act(() => {
          result.current[1].toggleItem(1);
        });
        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(true);

        act(() => {
          result.current[1].toggleItem(1);
        });

        expect(result.current[0].size).toBe(0);
        expect(result.current[0].has(1)).toBe(false);
      });
      it('should select another unselected item', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect' }));

        act(() => {
          result.current[1].toggleItem(1);
        });

        act(() => {
          result.current[1].toggleItem(2);
        });

        expect(result.current[0].size).toBe(2);
        expect(result.current[0].has(1)).toBe(true);
        expect(result.current[0].has(2)).toBe(true);
      });
    });
    describe('.selectItem', () => {
      it('should select item', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect' }));

        act(() => {
          result.current[1].selectItem(1);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(true);
      });
      it('should select multiple items', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect' }));

        act(() => {
          result.current[1].selectItem(1);
        });

        act(() => {
          result.current[1].selectItem(2);
        });

        expect(result.current[0].size).toBe(2);
        expect(result.current[0].has(1)).toBe(true);
        expect(result.current[0].has(2)).toBe(true);
      });
    });
    describe('.deselectItem', () => {
      it('should make item unselected', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect' }));

        act(() => {
          result.current[1].selectItem(1);
        });
        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(true);

        act(() => {
          result.current[1].deselectItem(1);
        });

        expect(result.current[0].size).toBe(0);
        expect(result.current[0].has(1)).toBe(false);
      });
    });
    describe('.clearItems', () => {
      it('should clear selection', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect' }));

        act(() => {
          result.current[1].toggleAllItems([1, 2, 3]);
        });

        expect(result.current[0].size).toBe(3);

        act(() => {
          result.current[1].clearItems();
        });

        expect(result.current[0].size).toBe(0);
      });
    });
    describe('.toggleAllItems', () => {
      const items = [0, 1, 2, 3];
      it('should select all items', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect' }));

        act(() => {
          result.current[1].toggleAllItems(items);
        });
        expect(result.current[0].size).toBe(items.length);
        expect(Array.from(result.current[0])).toEqual(items.map((_, i) => i));
      });
      it('should deselect all items', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'multiselect' }));

        act(() => {
          result.current[1].toggleAllItems(items);
        });

        act(() => {
          result.current[1].toggleAllItems(items);
        });
        expect(result.current[0].size).toBe(0);
      });
    });
  });
  describe('single select', () => {
    describe('.toggleItem', () => {
      it('should select unselected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single' }));

        act(() => {
          result.current[1].toggleItem(1);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(true);
      });

      it('should deselect selected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single' }));

        act(() => {
          result.current[1].toggleItem(1);
        });

        act(() => {
          result.current[1].toggleItem(2);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(false);
      });

      it('should select another unselected row', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single' }));

        act(() => {
          result.current[1].toggleItem(1);
        });

        act(() => {
          result.current[1].toggleItem(2);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(1)).toBe(false);
        expect(result.current[0].has(2)).toBe(true);
      });
    });
    describe('.selectItem', () => {
      it('should select item', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single' }));

        act(() => {
          result.current[1].selectItem(1);
        });

        expect(result.current[0].has(1)).toBe(true);
      });

      it('should select another item', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single' }));

        act(() => {
          result.current[1].selectItem(1);
        });

        act(() => {
          result.current[1].selectItem(2);
        });

        expect(result.current[0].size).toBe(1);
        expect(result.current[0].has(2)).toBe(true);
      });
    });
    describe('.deselectItem', () => {
      it('should make item unselected', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single' }));

        act(() => {
          result.current[1].selectItem(1);
        });

        act(() => {
          result.current[1].deselectItem(1);
        });

        expect(result.current[0].size).toBe(0);
      });
    });
    describe('.clearItems', () => {
      it('should clear selection', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single' }));

        act(() => {
          result.current[1].selectItem(1);
        });
        act(() => {
          result.current[1].clearItems();
        });

        expect(result.current[0].size).toBe(0);
      });
    });
    describe('.toggleAllItems', () => {
      it('should throw when not in production', () => {
        const { result } = renderHook(() => useSelection({ selectionMode: 'single' }));

        expect(result.current[1].toggleAllItems).toThrowErrorMatchingInlineSnapshot(
          `"[react-utilities]: \`toggleAllItems\` should not be used in single selection mode"`,
        );
      });
    });
  });
});
