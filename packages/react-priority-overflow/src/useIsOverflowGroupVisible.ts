import { useOverflowContext } from './overflowContext';

/**
 * @param id - unique identifier for a group of overflow items
 * @returns visibility state of the group
 */
export function useIsOverflowGroupVisible(id: string | number): boolean {
  return !!useOverflowContext(ctx => ctx.groupVisibility[id + '']);
}
