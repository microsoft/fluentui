import { css } from '../utilities/css';
import { ITheme } from '../utilities/theme';
import { StyleAttribute, parent } from 'glamor';

export function getFocusRule(
  theme: ITheme,
  inset: string = '0',
  color: string = theme.colors.neutralSecondary,
  position: string = 'absolute'
): StyleAttribute {

  return css(
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
  ) as StyleAttribute;

}
