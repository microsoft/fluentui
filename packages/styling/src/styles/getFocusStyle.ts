import { IRawStyle } from '@uifabric/merge-styles/lib/index';
import { ITheme } from '../interfaces/index';
import { HighContrastSelector } from './CommonStyles';
import { IsFocusVisibleClassName } from '@uifabric/utilities/lib/initializeFocusRects';
import { ZIndexes } from './zIndexes';

/**
 * Generates a focus style which can be used to define an :after focus border.
 *
 * @param theme - The theme object to use.
 * @param inset - The number of pixels to inset the border.
 * @param color - The color for the border.
 * @param position - The positioning applied to the container. Must
 * be 'relative' or 'absolute' so that the focus border can live around it.
 * @param highContrastStyle - Style for high contrast mode.
 * @returns The style object.
 */
export function getFocusStyle(
  theme: ITheme,
  inset: number = 0,
  position: 'relative' | 'absolute' = 'relative',
  highContrastStyle: IRawStyle | undefined = undefined
): IRawStyle {
  return {
    outline: 'transparent',
    position,

    selectors: {

      '::-moz-focus-inner': {
        border: '0'
      },

      [`.${IsFocusVisibleClassName} &:focus:after`]: {
        content: '""',
        position: 'absolute',
        left: inset + 1,
        top: inset + 1,
        bottom: inset + 1,
        right: inset + 1,
        border: '1px solid ' + theme.palette.white,
        outline: '1px solid ' + theme.palette.neutralSecondary,
        zIndex: ZIndexes.FocusStyle,
        selectors: {
          [HighContrastSelector]: highContrastStyle
        }
      }

    }
  };
}

/**
 * Generates style to clear browser specific focus styles.
 */
export function focusClear(): IRawStyle {
  return {
    selectors: {
      '&::-moz-focus-inner': {
        // Clear the focus border in Firefox. Reference: http://stackoverflow.com/a/199319/1436671
        border: 0
      },
      '&': {
        // Clear browser specific focus styles and use transparent as placeholder for focus style
        outline: 'transparent'
      }
    }
  };
}