import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';

export interface IDraggableZoneStyles {
  root: string;
}

export const getClassNames = memoizeFunction((className: string, isDragging: boolean): IDraggableZoneStyles => {
  return {
    root: mergeStyles(
      className,
      isDragging && {
        touchAction: 'none',
        selectors: {
          '& *': {
            userSelect: 'none',
          },
        },
      },
    ),
  };
});
