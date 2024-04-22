import { HighContrastSelector } from './CommonStyles';
import { IsFocusVisibleClassName } from '@fluentui/utilities';
import { ZIndexes } from './zIndexes';
import type { IRawStyle } from '@fluentui/merge-styles';
import type { IGetFocusStylesOptions, ITheme } from '../interfaces/index';

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
 * @param borderRadius - If the style should include a rounded border.
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
  isFocusedOnly?: boolean,
  borderRadius?: string | number | undefined,
): IRawStyle;
export function getFocusStyle(
  theme: ITheme,
  insetOrOptions?: number | IGetFocusStylesOptions,
  position?: 'relative' | 'absolute',
  highContrastStyle?: IRawStyle,
  borderColor?: string,
  outlineColor?: string,
  isFocusedOnly?: boolean,
  borderRadius?: string | number | undefined,
): IRawStyle {
  if (typeof insetOrOptions === 'number' || !insetOrOptions) {
    return _getFocusStyleInternal(theme, {
      inset: insetOrOptions,
      position,
      highContrastStyle,
      borderColor,
      outlineColor,
      isFocusedOnly,
      borderRadius,
    });
  } else {
    return _getFocusStyleInternal(theme, insetOrOptions);
  }
}

function _getFocusStyleInternal(theme: ITheme, options: IGetFocusStylesOptions = {}): IRawStyle {
  const {
    borderRadius,
    inset = 0,
    width = 1,
    position = 'relative',
    highContrastStyle,
    borderColor = theme.palette.white,
    outlineColor = theme.palette.neutralSecondary,
    isFocusedOnly = true,
    pointerEvents,
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
        border: '0',
      },

      // When the element that uses this mixin is in a :focus state, add a pseudo-element to
      // create a border.
      [`.${IsFocusVisibleClassName} &${isFocusedOnly ? ':focus' : ''}:after, :host(.${IsFocusVisibleClassName}) &${
        isFocusedOnly ? ':focus' : ''
      }:after`]: {
        content: '""',
        position: 'absolute',
        pointerEvents,
        left: inset + 1,
        top: inset + 1,
        bottom: inset + 1,
        right: inset + 1,
        border: `${width}px solid ${borderColor}`,
        outline: `${width}px solid ${outlineColor}`,
        zIndex: ZIndexes.FocusStyle,
        borderRadius,
        selectors: {
          [HighContrastSelector]: highContrastStyle,
        },
      },
    },
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
        border: 0,
      },
      '&': {
        // Clear browser specific focus styles and use transparent as placeholder for focus style
        outline: 'transparent',
      },
    },
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
        outlineOffset: `${-inset}px`,
      },
    },
  };
}

/**
 * Generates text input border styles on focus.
 *
 * @param borderColor - Color of the border.
 * @param borderRadius - Radius of the border.
 * @param borderType - Type of the border.
 * @param borderPosition - Position of the border relative to the input element (default to -1
 * as it's the most common border width of the input element)
 * @returns The style object.
 */
export const getInputFocusStyle = (
  borderColor: string,
  borderRadius: string | number,
  borderType: 'border' | 'borderBottom' = 'border',
  borderPosition: number = -1,
): IRawStyle => {
  const isBorderBottom = borderType === 'borderBottom';

  return {
    borderColor,
    selectors: {
      ':after': {
        pointerEvents: 'none',
        content: "''",
        position: 'absolute',
        left: isBorderBottom ? 0 : borderPosition,
        top: borderPosition,
        bottom: borderPosition,
        right: isBorderBottom ? 0 : borderPosition,
        [borderType]: `2px solid ${borderColor}`,
        borderRadius,
        width: borderType === 'borderBottom' ? '100%' : undefined,
        selectors: {
          [HighContrastSelector]: {
            [borderType === 'border' ? 'borderColor' : 'borderBottomColor']: 'Highlight',
          },
        },
      },
    },
  };
};
