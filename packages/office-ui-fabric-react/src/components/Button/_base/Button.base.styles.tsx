import { IButtonBaseStyles, IButtonBaseStyleProps } from './Button.base.types';
import {
  IRawStyle,
  getFocusStyle,
  FontSizes,
  hiddenContentStyle
} from '../../../Styling';

const noOutline: IRawStyle = {
  outline: 0
};

const iconStyle = {
  fontSize: FontSizes.icon,
  margin: '0 4px',
  height: '16px',
  lineHeight: '16px',
  textAlign: 'center',
  verticalAlign: 'middle',
  flexShrink: 0
};

export const getStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {
  const { theme, disabled } = props;
  const { fonts, semanticColors } = theme;

  let border = semanticColors.buttonBorder;
  let disabledBackground = semanticColors.disabledBackground;
  let disabledText = semanticColors.disabledText;

  return {
    root: {
      display: 'inline-flex'
    },
    button: [
      fonts.medium,
      getFocusStyle(theme, -1),
      {
        boxSizing: 'border-box',
        display: 'flex',
        textAlign: 'center',
        verticalAlign: 'top',
        border: '1px solid ' + border,
        borderRadius: 0,
        cursor: 'pointer',
        userSelect: 'none',
        textDecoration: 'none',
        height: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        padding: '0 16px'
      },
      disabled && {
        backgroundColor: disabledBackground,
        color: disabledText,
        cursor: 'default',
        pointerEvents: 'none',
        selectors: {
          ':hover': noOutline,
          ':focus': noOutline
        }
      }
    ],

    icon: [
      iconStyle,
      disabled && {
        color: disabledText
      }
    ],

    menuIcon: [
      iconStyle,
      {
        fontSize: FontSizes.small
      },
      disabled && {
        color: disabledText
      }
    ],

    textContainer: {
      flexGrow: 1
    },

    label: {
      margin: '0 4px',
      lineHeight: '100%'
    }
  };
};
