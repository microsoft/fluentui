import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role='gridcell'.
 */
export const gridCellWithFocusableElementBehavior: Accessibility = props => ({
  attributes: {
    root: {
      role: 'gridcell',
    },
  },
});
