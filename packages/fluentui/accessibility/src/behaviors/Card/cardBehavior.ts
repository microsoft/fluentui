import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a card component - semantic grouping of objects
 * @specification
 * Adds role='group'.
 * Adds attribute 'aria-roledescription' based on the property 'ariaRoleDescription' to 'root' slot.
 */
const cardBehavior: Accessibility<CardBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group',
      'aria-roledescription': props.ariaRoleDescription,
    },
  },
});

export default cardBehavior;

export type CardBehaviorProps = {
  /** Defines a human-readable, author-localized description for the role of an element. */
  ariaRoleDescription: string;
};
