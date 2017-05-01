import { IButtonClassNames } from './Button.Props';
import { ITheme, css, parent } from '@uifabric/styling';

export function getFocusStyle(
  theme: ITheme,
  inset: string = '0',
  color: string = theme.colors.neutralSecondary,
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

const noOutline = {
  outline: 0
};

export function getStyles(
  theme: ITheme,
  focusInset?: string,
  focusColor?: string): IButtonClassNames {

  const iconStyle = css({
    margin: '0 4px',
    height: '16px',
    lineHeight: '16px',
    textAlign: 'center',
    verticalAlign: 'middle'
  });

  return {

    root: css(
      getFocusStyle(theme, focusInset, focusColor),
      {
        // this transparent border converts to the correct colors in HC mode
        boxSizing: 'border-box',
        border: '1px solid transparent',
        userSelect: 'none',
        display: 'inline-block',
        textDecoration: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        verticalAlign: 'top',
        padding: '0 16px'
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

    icon: iconStyle,

    menuIcon: iconStyle,

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
