import * as React from 'react';
import { useOverflowContext } from './overflowContext';

/**
 * A hook that returns the visibility status of all items and groups.
 *
 * ⚠️ Heads up!
 *
 * This hook will cause the component it is in to re-render for every single time an item overflows or becomes
 * visible - use with caution
 * @returns visibility status of all items and groups
 */
export function useOverflowVisibility(): {
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, import('@fluentui/priority-overflow').OverflowGroupState>;
} {
  const itemVisibility = useOverflowContext(ctx => ctx.itemVisibility);
  const groupVisibility = useOverflowContext(ctx => ctx.groupVisibility);

  return React.useMemo(() => ({ itemVisibility, groupVisibility }), [itemVisibility, groupVisibility]);
}
