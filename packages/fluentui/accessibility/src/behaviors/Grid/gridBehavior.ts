import { Accessibility } from '../../types';
import { FocusZoneDirection } from '../../focusZone/types';

/**
 * @description
 * Provides navigation between focusable children of Grid component with arrow keys in 4 directions.
 *
 * @specification
 * Provides arrow key navigation in bidirectional direction.
 */
export const gridBehavior: Accessibility<GridBehaviorProps> = () => ({
  attributes: {},
  focusZone: {
    props: {
      direction: FocusZoneDirection.bidirectional,
    },
  },
});

export type GridBehaviorProps = never;
