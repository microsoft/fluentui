import { Accessibility } from '../../types';

/**
 * @description
 * Behavior for a card component - semantic grouping of objects
 * @specification
 * Adds role='group'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */
export const cardBehavior: Accessibility<CardBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
      'aria-disabled': props.disabled,
    },
  },
});

export type CardBehaviorProps = {
  /** A card can show it is currently unable to be interacted with. */
  disabled?: boolean;
};
