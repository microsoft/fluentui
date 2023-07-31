import { useOverflowContext } from '@fluentui/priority-overflow';

/**
 * @returns Number of items that are overflowing
 */
export const useOverflowCount = () =>
  useOverflowContext(v => {
    return Object.entries(v.itemVisibility).reduce((acc, [id, visible]) => {
      if (!visible) {
        acc++;
      }

      return acc;
    }, 0);
  });
