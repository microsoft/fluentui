import type { SlotClassNames } from '@fluentui/react-utilities';
import type { OptionSlots } from './Option.types';

/**
 * Static class names for the Option slots.
 *
 * Kept outside of the styles file because hooks match options by these class names, and importing them from the
 * styles file would pull Griffel styles into consumer bundles.
 */
export const optionClassNames: SlotClassNames<OptionSlots> = {
  root: 'fui-Option',
  checkIcon: 'fui-Option__checkIcon',
};
