import { Accessibility } from '../../types';
import { IS_FOCUSABLE_ATTRIBUTE } from '../../attributes';

/**
 * @description
 * @specification
 * Adds role='gridcell'.
 * Adds attribute 'data-is-focusable=true' to 'root' slot.
 */
export const gridCellBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'gridcell',
      [IS_FOCUSABLE_ATTRIBUTE]: true,
    },
  },
});
