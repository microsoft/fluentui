import { mergeStyles } from '../utilities/index';
import { IProcessedStyle, ITheme } from '../interfaces/index';
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
  color: string | undefined = theme.palette.neutralSecondary,
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

export function getFocusStyleBasedOnAncestorClass(
  theme: ITheme,
  ancestorSelectorName: string = '.ms-Fabric.is-focusVisible .is-inFocus',
  inset: string = '0',
  color: string | undefined = theme.palette.neutralSecondary,
): IProcessedStyle {
  let padding = '0';
  return mergeStyles(
    parent(ancestorSelectorName, {
      outline: 'transparent',
      ':after': {
        content: '""',
        position: 'absolute',
        top: padding,
        right: padding,
        bottom: padding,
        left: padding,
        margin: '0 4px',
        border: '1px solid ' + color,
        pointerEvents: 'none'
      }
    })
  );
}
