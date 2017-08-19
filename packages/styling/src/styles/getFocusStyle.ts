import { IExtendedRawStyle } from '@uifabric/merge-styles';
import { ITheme } from '../interfaces/index';

/**
 * Generates a focus style which can be used to define an :after focus border.
 *
 * @param theme - The theme object to use.
 * @param inset - The number of pixels to inset the border.
 * @param color - The color for the border.
 * @param position - The positioning applied to the container. Must
 * be 'relative' or 'absolute' so that the focus border can live around it.
 * @returns The style object.
 */
export function getFocusStyle(
  theme: ITheme,
  inset: string = '0',
  color: string | undefined = theme.palette.neutralSecondary,
  position: 'relative' | 'absolute' = 'relative'
): IExtendedRawStyle {
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
        left: inset,
        top: inset,
        bottom: inset,
        right: inset,
        border: '1px solid ' + color
      }

    }
  };
}