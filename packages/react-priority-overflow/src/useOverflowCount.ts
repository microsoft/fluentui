import { useOverflowContext } from './overflowContext';

/**
 * @returns Number of items that are overflowing
 */
export const useOverflowCount = () =>
  useOverflowContext(v => {
    return Object.entries(v.itemVisibility).reduce((acc, [id, visible]) => {
      // TODO remove the divider match since all dividers should either be rendered as part of the item or
      // associated with a group. Dividers should not be overflow items
      if (!id.startsWith('divider') && !visible) {
        acc++;
      }

      return acc;
    }, 0);
  });
