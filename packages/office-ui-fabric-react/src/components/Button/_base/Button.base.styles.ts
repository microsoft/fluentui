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
  height: 16,
  lineHeight: 16,
  textAlign: 'center',
  verticalAlign: 'middle',
  flexShrink: 0
};

export const getButtonBaseStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {
  const { theme, disabled } = props;
  const { fonts, semanticColors } = theme;

  let border = semanticColors.buttonBorder;
  let disabledBackground = semanticColors.disabledBackground;
  let disabledText = semanticColors.disabledText;

  return {
    root: [
      'ms-Button',
      props.className,
      {
        display: 'inline-flex'
      }
    ],
    button: [
      fonts.medium,
      getFocusStyle(theme, -1),
      {
        background: 'transparent',
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
      'ms-Button-icon',
      iconStyle,
      disabled && {
        color: disabledText
      }
    ],

    menuIcon: [
      'ms-Button-menuIcon',
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

    label: [
      'ms-Button-label',
      {
        margin: '0 4px',
        lineHeight: '100%'
      }
    ],
    description: [
      'ms-Button-description'
    ]
  };
};
