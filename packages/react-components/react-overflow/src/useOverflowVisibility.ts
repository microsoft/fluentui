import { useOverflowContext } from './overflowContext';

/**
 * A hook that returns the visibility status of all items and groups. This hook
 * will cause the component it is in to re-render for every single time an item overflows or becomes
 * visible - use with caution
 * @returns visibility status of all items and groups
 */
export function useOverflowVisibility() {
  return useOverflowContext(ctx => ({ itemVisibility: ctx.itemVisibility, groupVisibility: ctx.groupVisibility }));
}
