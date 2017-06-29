import { mergeStyles } from '../utilities/index';
import { IProcessedStyle } from '../interfaces/index';
import { ITheme } from './theme';
import { parent } from '../glamorExports';

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
  color: string = theme.palette.neutralSecondary,
  position: 'relative' | 'absolute' = 'relative'
): IProcessedStyle {
  return mergeStyles(
    {
      outline: 'transparent',
      position
    },
    parent('.ms-Fabric.is-focusVisible', {
      ':focus:after': {
        content: '""',
        position: 'absolute',
        left: inset,
        top: inset,
        bottom: inset,
        right: inset,
        border: '1px solid ' + color
      }
    })
  );
}
