import { IRawStyle } from '@uifabric/merge-styles';
import { IGetFocusStylesOptions, ITheme } from '../interfaces/index';
import { HighContrastSelector } from './CommonStyles';
import { IsFocusVisibleClassName } from '@uifabric/utilities';
import { ZIndexes } from './zIndexes';

/**
 * Generates a focus style which can be used to define an :after focus border.
 * @param theme - The theme object to use.
 * @param options - Options to customize the focus border.
 */
export function getFocusStyles(theme: ITheme, options: IGetFocusStylesOptions = {}): IRawStyle {
  const {
    inset = 0,
    position = 'relative',
    highContrastStyle,
    borderColor = theme.palette.white,
    outlineColor = theme.palette.neutralSecondary,
    isFocusedOnly = true
  } = options;

  return {
    outline: 'transparent',
    position,

    selectors: {
      '::-moz-focus-inner': {
        border: '0'
      },

      [`.${IsFocusVisibleClassName} &${isFocusedOnly ? ':focus' : ''}:after`]: {
        content: '""',
        position: 'absolute',
        left: inset + 1,
        top: inset + 1,
        bottom: inset + 1,
        right: inset + 1,
        border: '1px solid ' + borderColor,
        outline: '1px solid ' + outlineColor,
        zIndex: ZIndexes.FocusStyle,
        selectors: {
          [HighContrastSelector]: highContrastStyle
        }
      }
    }
  };
}

/**
 * Generates a focus style which can be used to define an :after focus border.
 * Deprecated Use `getFocusStyles` instead.
 *
 * @deprecated Use `getFocusStyles` instead.
 *
 * @param theme - The theme object to use.
 * @param inset - The number of pixels to inset the border.
 * @param position - The positioning applied to the container. Must
 * be 'relative' or 'absolute' so that the focus border can live around it.
 * @param highContrastStyle - Style for high contrast mode.
 * @param borderColor - Color of the border.
 * @param outlineColor - Color of the outline.
 * @param isFocusedOnly - If the styles should apply on focus or not.
 * @returns The style object.
 */
export function getFocusStyle(
  theme: ITheme,
  inset: number = 0,
  position: 'relative' | 'absolute' = 'relative',
  highContrastStyle: IRawStyle | undefined = undefined,
  borderColor: string = theme.palette.white,
  outlineColor: string = theme.palette.neutralSecondary,
  isFocusedOnly: boolean = true
): IRawStyle {
  return getFocusStyles(theme, { inset, position, highContrastStyle, borderColor, outlineColor, isFocusedOnly });
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
