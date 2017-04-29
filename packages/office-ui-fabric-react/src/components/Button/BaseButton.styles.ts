import { IButtonClassNames } from './Button.Props';
import { ITheme, css, parent } from '@uifabric/styling';

export function getFocusStyle(
  theme: ITheme,
  inset: string = '0',
  color: string = theme.colors.neutralTertiaryAlt,
  position: string = 'absolute'): React.CSSProperties {
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
  );
}

export const DEFAULT_BUTTON_HEIGHT = '32px';
export const DEFAULT_BUTTON_MINWIDTH = '80px';
export const DEFAULT_BUTTON_PADDING = '0 16px';

const noOutline = {
  outline: 0
};

export function getStyles(theme: ITheme, inset?: string, focusColor?: string): IButtonClassNames {
  return {

    root: css(
      getFocusStyle(theme, inset, focusColor),
      {
        userSelect: 'none',
        display: 'inline-block',
        border: 'none',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        verticalAlign: 'top',

        padding: DEFAULT_BUTTON_PADDING
      }
    ),

    rootDisabled: css({
      backgroundColor: theme.colors.neutralLighter,
      color: theme.colors.neutralTertiary,
      cursor: 'default',
      pointerEvents: 'none',

      ':hover': noOutline,
      ':focus': noOutline
    }),

    flexContainer: css({
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    }),

    icon: css({
      margin: '0 4px',
      height: '16px',
      lineHeight: '16px',
      textAlign: 'center',
      verticalAlign: 'middle'
    }),

    label: css({
      margin: '0 4px',
      lineHeight: '100%'
    }),

    screenReaderText: css({
      position: 'absolute',
      width: '1px',
      height: '1px',
      margin: '-1px',
      padding: 0,
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      border: 0
    })
  };
}
