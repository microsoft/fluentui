import { Accessibility } from '../../types';

/**
 * @specification
 * Adds role='gridcell'.
 */
export const gridCellWithFocusableElementBehavior: Accessibility<GridCellWithFocusableElementBehavior> = () => ({
  attributes: {
    root: {
      role: 'gridcell',
    },
  },
});

type GridCellWithFocusableElementBehavior = never;
