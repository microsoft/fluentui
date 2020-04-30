import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role 'group' to 'root' slot.
 */

const buttonGroupBehavior: Accessibility<ButtonGroupBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export default buttonGroupBehavior;

export type ButtonGroupBehaviorProps = never;
