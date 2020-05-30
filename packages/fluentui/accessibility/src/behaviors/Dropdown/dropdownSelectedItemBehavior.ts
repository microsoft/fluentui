import { Accessibility } from '../../types';

/**
 * @specification
 * Adds attribute 'aria-selected=true' to 'root' slot.
 */

const dropdownSelectedItemBehavior: Accessibility<DropdownSelectedItemBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-selected': true,
      tabIndex: props.active ? 0 : -1,
    },
    icon: {
      'aria-label': `Remove ${props.header} from selection.`,
    },
  },
});

export type DropdownSelectedItemBehaviorProps = { header: string; active: boolean };

export default dropdownSelectedItemBehavior;
