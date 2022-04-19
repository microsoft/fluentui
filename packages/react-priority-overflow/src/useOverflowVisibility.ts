import { useOverflowContext } from './overflowContext';

/**
 * Provides visibility methods for multiple items or groups.
 */
export const useOverflowVisibility = () => {
  const itemVisibility = useOverflowContext(ctx => ctx.itemVisibility);
  const groupVisibility = useOverflowContext(ctx => ctx.groupVisibility);

  return {
    isItemVisible: (id: string) => itemVisibility[id],
    isGroupVisible: (id: string) => groupVisibility[id],
  };
};
