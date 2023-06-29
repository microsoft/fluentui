import * as React from 'react';
import { SelectionHookParams, SelectionMethods, SelectionValue } from './types';
import { useControllableState } from '../hooks/useControllableState';
import { createSetFromIterable } from '../utils/createSetFromIterable';

function useSelectionState<Value>(params: Omit<SelectionHookParams<Value>, 'selectionMode'>) {
  const [selected, setSelected] = useControllableState<Set<Value>>({
    initialState: new Set(),
    defaultState: React.useMemo(
      () => params.defaultSelectedItems && createSetFromIterable(params.defaultSelectedItems),
      [params.defaultSelectedItems],
    ),
    state: React.useMemo(
      () => params.selectedItems && createSetFromIterable(params.selectedItems),
      [params.selectedItems],
    ),
  });
  const dispatchSelectedAndReturn = (nextSelected: Set<Value>) => {
    setSelected(nextSelected);
    return nextSelected;
  };
  return [selected, dispatchSelectedAndReturn] as const;
}

function useSingleSelection<Value>(params: Omit<SelectionHookParams<Value>, 'selectionMode'>) {
  const [selected, setSelection] = useSelectionState<Value>(params);
  const methods: SelectionMethods<Value> = {
    deselectItem: () => setSelection(new Set<Value>()),
    selectItem: value => setSelection(new Set([value])),
    toggleAllItems: () => {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error('[react-utilities]: `toggleAllItems` should not be used in single selection mode');
      }
      return selected;
    },
    toggleItem: value => setSelection(new Set([value])),
    clearItems: () => setSelection(new Set()),
    isSelected: value => selected.has(value) ?? false,
  };
  return [selected, methods] as const;
}

function useMultipleSelection<Value>(params: Omit<SelectionHookParams<Value>, 'selectionMode'>) {
  const [selected, setSelection] = useSelectionState<Value>(params);
  const methods: SelectionMethods<Value> = {
    toggleItem: value => {
      const nextSelectedItems = new Set(selected);
      if (selected.has(value)) {
        nextSelectedItems.delete(value);
      } else {
        nextSelectedItems.add(value);
      }
      return setSelection(nextSelectedItems);
    },
    selectItem: value => {
      const nextSelectedItems = new Set(selected);
      nextSelectedItems.add(value);
      return setSelection(nextSelectedItems);
    },
    deselectItem: value => {
      const nextSelectedItems = new Set(selected);
      nextSelectedItems.delete(value);
      return setSelection(nextSelectedItems);
    },
    clearItems: () => {
      return setSelection(new Set());
    },
    isSelected: value => selected.has(value),
    toggleAllItems: values => {
      const allItemsSelected = values.every(value => selected.has(value));
      const nextSelectedItems = new Set(selected);
      if (allItemsSelected) {
        nextSelectedItems.clear();
      } else {
        values.forEach(value => nextSelectedItems.add(value));
      }
      return setSelection(nextSelectedItems);
    },
  };
  return [selected, methods] as const;
}

export function useSelection<Value = SelectionValue>(params: SelectionHookParams<Value>) {
  if (params.selectionMode === 'multiselect') {
    // selectionMode is a static value, so we can safely ignore rules-of-hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMultipleSelection<Value>(params);
  }
  // selectionMode is a static value, so we can safely ignore rules-of-hooks
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSingleSelection<Value>(params);
}
