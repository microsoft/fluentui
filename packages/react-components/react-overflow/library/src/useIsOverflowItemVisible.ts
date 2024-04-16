import { useOverflowContext } from './overflowContext';

/**
 * @param id - unique identifier for the item used by the overflow manager
 * @returns visibility state of an overflow item
 */
export function useIsOverflowItemVisible(id: string): boolean {
  return !!useOverflowContext(ctx => ctx.itemVisibility[id]);
}
