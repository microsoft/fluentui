import { mergeStyles } from '../utilities/index';
import { IStyle } from '../interfaces/index';
import { ITheme } from '../utilities/theme';
import { parent } from '../glamorExports';

/**
 * Generates a focus rule which can be used to define an :after focus border.
 *
 * @param theme - The theme object to use.
 * @param inset - The number of pixels to inset the border.
 * @param color - The color for the border.
 * @param position - The positioning applied to the container. Must
 * be 'relative' or 'absolute' so that the focus border can live around it.
 * @returns {IStyle} The style object.
 */
export function getFocusRule(
  theme: ITheme,
  inset: string = '0',
  color: string = theme.palette.neutralSecondary,
  position: 'relative' | 'absolute' = 'relative'
): IStyle {
  return mergeStyles(
    {
      outline: 'transparent',
      position,
    },
    parent('.ms-Fabric.is-focusVisible', {
      ':focus:after': {
        content: '""',
        position,
        left: inset,
        top: inset,
        bottom: inset,
        right: inset,
        border: '1px solid ' + color
      }
    })
  );
}
