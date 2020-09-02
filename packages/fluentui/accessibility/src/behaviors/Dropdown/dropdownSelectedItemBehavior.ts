import { Accessibility } from '../../types';

/**
 * @description
 * Add tabIndex to 0 if active and -1 if not
 * Adds `aria-label` for remove icon
 * @specification
 * Adds attribute 'aria-selected=true' to 'root' slot.
 */
export const dropdownSelectedItemBehavior: Accessibility<DropdownSelectedItemBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'option',
      tabIndex: props.active ? 0 : -1,
    },
    icon: {
      'aria-hidden': 'true',
    },
  },
});

export type DropdownSelectedItemBehaviorProps = { header: string; active: boolean };
