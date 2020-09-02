import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role 'group' to 'root' slot.
 */
export const buttonGroupBehavior: Accessibility<ButtonGroupBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
    },
  },
});

export type ButtonGroupBehaviorProps = never;
