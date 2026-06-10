import { useState } from 'react';

import { useFilteredItems, useItemField } from '@acme/store-hooks';

interface Item {
  type: string;
}

export function useShouldRenderItem({ itemId }: { itemId: string }) {
  const [open] = useState(false);
  // Fresh inline filter arrow + fresh inline `{ itemId }` object every render.
  const items = useFilteredItems((item: Item): boolean => item.type === 'primary', { itemId });
  // Fresh inline arrow equalityFn every render.
  const label = useItemField(itemId, 'label', { equalityFn: (a: string, b: string) => a === b });
  return open && items.length > 0 && Boolean(label);
}
