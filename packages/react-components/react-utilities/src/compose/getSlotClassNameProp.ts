import { SLOT_CLASS_NAME_PROP_SYMBOL } from '../compose/constants';
import type { UnknownSlotProps } from '../compose/types';

/**
 * Get the className prop set on the slot by the user, without including the default classes added by the component.
 * Custom style hooks should merge this className _after_ any additional classes added by the hook, to ensure that
 * classes added by the user take precedence over the custom style hook.
 *
 * Example usage in a custom style hook:
 * ```ts
 * state.root.className = mergeClasses(
 *   state.root.className,
 *   customStyles.root,
 *   getSlotClassNameProp_unstable(state.root));
 * ```
 *
 * @returns The className prop set on the slot by the user, or undefined if not set.
 */
export const getSlotClassNameProp = (slot: UnknownSlotProps): string | undefined => {
  if (SLOT_CLASS_NAME_PROP_SYMBOL in slot && typeof slot[SLOT_CLASS_NAME_PROP_SYMBOL] === 'string') {
    return slot[SLOT_CLASS_NAME_PROP_SYMBOL];
  }
  return undefined;
};
