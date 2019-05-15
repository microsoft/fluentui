import { IRawStyle } from '@uifabric/merge-styles';
import { IGetFocusStylesOptions, ITheme } from '../interfaces/index';
import { HighContrastSelector } from './CommonStyles';
import { IsFocusVisibleClassName } from '@uifabric/utilities';
import { ZIndexes } from './zIndexes';

/**
 * Generates a focus style which can be used to define an :after focus border.
 *
 * @param theme - The theme object to use.
 * @param options - Options to customize the focus border.
 * @returns The style object.
 */
export function getFocusStyle(theme: ITheme, options?: IGetFocusStylesOptions): IRawStyle;
/**
 * Generates a focus style which can be used to define an :after focus border.
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
 * @deprecated Use the object parameter version instead.
 */
export function getFocusStyle(
  theme: ITheme,
  inset?: number,
  position?: 'relative' | 'absolute',
  highContrastStyle?: IRawStyle | undefined,
  borderColor?: string,
  outlineColor?: string,
  isFocusedOnly?: boolean
): IRawStyle;
export function getFocusStyle(
  theme: ITheme,
  insetOrOptions?: number | IGetFocusStylesOptions,
  position?: 'relative' | 'absolute',
  highContrastStyle?: IRawStyle,
  borderColor?: string,
  outlineColor?: string,
  isFocusedOnly?: boolean
): IRawStyle {
  if (typeof insetOrOptions === 'number' || !insetOrOptions) {
    return _getFocusStyleInternal(theme, { inset: insetOrOptions, position, highContrastStyle, borderColor, outlineColor, isFocusedOnly });
  } else {
    return _getFocusStyleInternal(theme, insetOrOptions);
  }
}

function _getFocusStyleInternal(theme: ITheme, options: IGetFocusStylesOptions = {}): IRawStyle {
  const {
    inset = 0,
    width = 1,
    position = 'relative',
    highContrastStyle,
    borderColor = theme.palette.white,
    outlineColor = theme.palette.neutralSecondary,
    isFocusedOnly = true
  } = options;

  return {
    // Clear browser-specific focus styles and use 'transparent' as placeholder for focus style.
    outline: 'transparent',
    // Requirement because pseudo-element is absolutely positioned.
    position,

    selectors: {
      // Clear the focus border in Firefox.
      // Reference: http://stackoverflow.com/a/199319/1436671
      '::-moz-focus-inner': {
        border: '0'
      },

      // When the element that uses this mixin is in a :focus state, add a pseudo-element to
      // create a border.
      [`.${IsFocusVisibleClassName} &${isFocusedOnly ? ':focus' : ''}:after`]: {
        content: '""',
        position: 'absolute',
        left: inset + 1,
        top: inset + 1,
        bottom: inset + 1,
        right: inset + 1,
        border: `${width}px solid ${borderColor}`,
        outline: `${width}px solid ${outlineColor}`,
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

/**
 * Generates a style which can be used to set a border on focus.
 *
 * @param theme - The theme object to use.
 * @param inset - The number of pixels to inset the border (default 0)
 * @param width - The border width in pixels (default 1)
 * @param color - Color of the outline (default `theme.palette.neutralSecondary`)
 * @returns The style object.
 */
export function getFocusOutlineStyle(theme: ITheme, inset: number = 0, width: number = 1, color?: string): IRawStyle {
  return {
    selectors: {
      [`:global(${IsFocusVisibleClassName}) &:focus`]: {
        outline: `${width} solid ${color || theme.palette.neutralSecondary}`,
        outlineOffset: `${-inset}px`
      }
    }
  };
}
