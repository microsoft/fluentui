import { mergeStyles } from '../utilities/index';
import { IStyle } from '../interfaces/index';
import { ITheme } from '../utilities/theme';
import { parent } from '../glamorExports';

export function getFocusRule(
  theme: ITheme,
  inset: string = '0',
  color: string = theme.palette.neutralSecondary,
  position: string = 'absolute'
): IStyle {
  return mergeStyles(
    {
      outline: 'transparent',
      position: 'relative',
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
