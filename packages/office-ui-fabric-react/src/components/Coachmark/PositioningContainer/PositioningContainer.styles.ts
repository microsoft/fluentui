import { memoizeFunction } from '../../../Utilities';
import { mergeStyleSets } from '../../../Styling';
import { IStyle } from '../../../Styling';

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

// @TODO Remove this tslint disable statement after the styles are converted
// to the updated mergeStyles method.
/* tslint:disable */
export function highContrastActive(styles: IStyle): any {
  return {
    '@media screen and (-ms-high-contrast: active)': styles
  };
}

export function focusClear(): any {
  return {
    '&::-moz-focus-inner': {
      border: 0
    },
    '&': {
      outline: 'transparent'
    }
  };
}
/* tslint:enable */

export const getClassNames = memoizeFunction(
  (): IPositioningContainerNames => {
    return mergeStyleSets({
      root: {
        position: 'absolute',
        boxSizing: 'border-box',
        border: '1px solid ${}',
        selectors: {
          ...highContrastActive({
            border: '1px solid WindowText'
          }),
          ...focusClear()
        }
      },
      container: {
        position: 'relative'
      },
      main: {
        backgroundColor: '#ffffff',
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'relative'
      },
      overFlowYHidden: {
        overflowY: 'hidden'
      }
    });
  }
);
