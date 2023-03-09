import { memoizeFunction } from '../../../Utilities';
import { mergeStyleSets, focusClear, HighContrastSelector } from '../../../Styling';
import type { IStyle } from '../../../Styling';

export interface IPositioningContainerStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;
}

export interface IPositioningContainerNames {
  /**
   * Root html container for this component.
   */
  root: string;
  container: string;
  main: string;
  overFlowYHidden: string;
  beak?: string;
  beakCurtain?: string;
}

export const getClassNames = memoizeFunction((): IPositioningContainerNames => {
  return mergeStyleSets({
    root: [
      {
        position: 'absolute',
        boxSizing: 'border-box',
        border: '1px solid ${}',
        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText',
          },
        },
      },
      focusClear(),
    ],
    container: {
      position: 'relative',
    },
    main: {
      backgroundColor: '#ffffff',
      overflowX: 'hidden',
      overflowY: 'hidden',
      position: 'relative',
    },
    overFlowYHidden: {
      overflowY: 'hidden',
    },
  });
});
