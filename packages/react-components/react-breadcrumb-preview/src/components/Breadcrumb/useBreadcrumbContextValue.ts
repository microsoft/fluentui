import * as React from 'react';
import type { BreadcrumbContextValues, BreadcrumbItem, BreadcrumbState } from './Breadcrumb.types';

export function useBreadcrumbContextValues_unstable(state: BreadcrumbState): BreadcrumbContextValues {
  const { size } = state;
  const [items, setItems] = React.useState<BreadcrumbContextValues['items']>(new Set());

  const registerItem = React.useCallback((item: BreadcrumbItem) => {
    setItems(prevItems => {
      const newItems = new Set(prevItems);

      newItems.add(item);

      return newItems;
    });
  }, []);

  const removeItem = React.useCallback((item: BreadcrumbItem) => {
    setItems(prevItems => {
      const newItems = new Set(prevItems);

      newItems.delete(item);

      return newItems;
    });
  }, []);

  const hasInteractiveItems = React.useMemo(() => [...items].some(item => item.type === 'button'), [items]);

  return { size, items, registerItem, removeItem, hasInteractiveItems };
}
