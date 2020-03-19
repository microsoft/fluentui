import { Accessibility } from '../../types';
/**
 * @description
 * Behavior for a card component - semantic grouping of objects
 * @specification
 * Adds role `group` to the container
 */
const cardBehavior: Accessibility<CardBehaviorProps> = props => ({
  attributes: {
    root: {
      role: 'group'
    }
  }
});

export default cardBehavior;

export type CardBehaviorProps = never;
