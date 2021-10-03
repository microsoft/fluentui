import { useTriggerElement } from './useTriggerElement';
import type { MenuTriggerProps, MenuTriggerState } from './MenuTrigger.types';

/**
 * Create the state required to render MenuTrigger.
 * Clones the only child component and adds necessary event handling behaviours to open a popup menu
 *
 * @param props - props from this instance of MenuTrigger
 */
export const useMenuTrigger = (props: MenuTriggerProps): MenuTriggerState => {
  const state = { ...props };

  // TODO just move the contents of this hook here
  return useTriggerElement(state);
};
