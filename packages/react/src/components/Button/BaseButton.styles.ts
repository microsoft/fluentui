import { memoizeFunction } from '../../Utilities';
import { HighContrastSelector, getFocusStyle, hiddenContentStyle } from '../../Styling';
import type { IButtonStyles } from './Button.types';
import type { ITheme, IRawStyle } from '../../Styling';

const noOutline: IRawStyle = {
  outline: 0,
};

const iconStyle = (fontSize?: string | number): IRawStyle => {
  return {
    fontSize,
    margin: '0 4px',
    height: '16px',
    lineHeight: '16px',
    textAlign: 'center',
    flexShrink: 0,
  };
};

/**
 * Gets the base button styles. Note: because it is a base class to be used with the `mergeRules`
 * helper, it should have values for all class names in the interface. This let `mergeRules` optimize
 * mixing class names together.
 */
export const getStyles = memoizeFunction((theme: ITheme): IButtonStyles => {
  const { semanticColors, effects, fonts } = theme;

  const border = semanticColors.buttonBorder;
  const disabledBackground = semanticColors.disabledBackground;
  const disabledText = semanticColors.disabledText;
  const buttonHighContrastFocus = {
    left: -2,
    top: -2,
    bottom: -2,
    right: -2,
    outlineColor: 'ButtonText',
  };

  return {
    root: [
      getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent' }),
      theme.fonts.medium,
      {
        border: '1px solid ' + border,
        borderRadius: effects.roundedCorner2,
        boxSizing: 'border-box',
        cursor: 'pointer',
        display: 'inline-block',
        padding: '0 16px',
        textDecoration: 'none',
        textAlign: 'center',
        userSelect: 'none',

        // IE11 workaround for preventing shift of child elements of a button when active.
        ':active > span': {
          position: 'relative',
          left: 0,
          top: 0,
        },
      },
    ],

    rootDisabled: [
      getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent' }),
      {
        backgroundColor: disabledBackground,
        borderColor: disabledBackground,
        color: disabledText,
        cursor: 'default',
        ':hover': noOutline,
        ':focus': noOutline,
      },
    ],

    iconDisabled: {
      color: disabledText,
      [HighContrastSelector]: {
        color: 'GrayText',
      },
    },

    menuIconDisabled: {
      color: disabledText,
      [HighContrastSelector]: {
        color: 'GrayText',
      },
    },

    flexContainer: {
      display: 'flex',
      height: '100%',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    description: {
      display: 'block',
    },

    textContainer: {
      flexGrow: 1,
      display: 'block',
    },

    icon: iconStyle(fonts.mediumPlus.fontSize),

    menuIcon: iconStyle(fonts.small.fontSize),

    label: {
      margin: '0 4px',
      lineHeight: '100%',
      display: 'block',
    },

    screenReaderText: hiddenContentStyle,
  };
});
