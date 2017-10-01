import { IRawStyle } from '@uifabric/merge-styles/lib/index';
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
  inset: number = 0,
  position: 'relative' | 'absolute' = 'relative'
): IRawStyle {
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
        left: inset + 1,
        top: inset + 1,
        bottom: inset + 1,
        right: inset + 1,
        border: '1px solid ' + theme.palette.white,
        outline: '1px solid ' + theme.palette.neutralSecondary,
        zIndex: 1
      }
    }
  };
}
