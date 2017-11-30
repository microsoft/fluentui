import { IRawStyle } from '@uifabric/merge-styles/lib/index';
import { ITheme } from '../interfaces/index';

/**
 * Generates a focus style which can be used to define an :after focus border.
 *
 * @param theme - The theme object to use.
 * @param inset - The number of pixels to inset the border.
 * @param position - The positioning applied to the container. Must
 * be 'relative' or 'absolute' so that the focus border can live around it.
 * @param borderColor - The color for the border. Default is 'theme.palette.white'.
 * @param outlineColor - The color for the outline. Default is 'theme.palette.neutralSecondary'.
 * @returns The style object.
 */
export function getFocusStyle(
  theme: ITheme,
  inset: number = 0,
  position: 'relative' | 'absolute' = 'relative',
  borderColor?: string,
  outlineColor?: string
): IRawStyle {

  const insetValue = inset + 1;
  borderColor = borderColor || theme.palette.white;
  outlineColor = outlineColor || theme.palette.neutralSecondary;

  return {
    outline: 'transparent',
    position,

    selectors: {

      '::-moz-focus-inner': {
        border: '0'
      },

      '.ms-Fabric.is-focusVisible &:focus:after': {
        content: '""',
        position: 'absolute',
        left: insetValue,
        top: insetValue,
        bottom: insetValue,
        right: insetValue,
        border: '1px solid ' + borderColor,
        outline: '1px solid ' + outlineColor,
        zIndex: 1
      }

    }
  };
}