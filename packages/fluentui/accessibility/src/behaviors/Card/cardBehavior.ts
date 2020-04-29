import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a card component - semantic grouping of objects
 * @specification
 * Adds role='group'.
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 * Adds attribute 'aria-selected=true' based on the property 'selected'.
 */
const cardBehavior: Accessibility<CardBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
      'aria-disabled': props.disabled,
      'aria-selected': props.selected,
    },
  },
});

export default cardBehavior;

export type CardBehaviorProps = {
  /** A card can show it is currently unable to be interacted with. */
  disabled?: boolean;
  /** A card can show that it is currently selected or not. */
  selected?: boolean;
};
