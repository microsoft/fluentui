import { Accessibility } from '../../types';

/**
 * @description
 * Add tabIndex to 0 if active and -1 if not
 * @specification
 * Adds role='option'.
 * Adds attribute 'aria-hidden=true' to 'icon' slot.
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
