import { IButtonStyles } from './Button.types';
import { memoizeFunction } from '../../Utilities';
import { HighContrastSelector, ITheme, IRawStyle, getFocusStyle, hiddenContentStyle } from '../../Styling';

const noOutline: IRawStyle = {
  outline: 0
};

const iconStyle = (fontSize?: string | number): IRawStyle => {
  return {
    fontSize: fontSize,
    margin: '0 4px',
    height: '16px',
    lineHeight: '16px',
    textAlign: 'center',
    verticalAlign: 'middle',
    flexShrink: 0
  };
};

/**
 * Gets the base button styles. Note: because it is a base class to be used with the `mergeRules`
 * helper, it should have values for all class names in the interface. This let `mergeRules` optimize
 * mixing class names together.
 */
export const getStyles = memoizeFunction(
  (theme: ITheme): IButtonStyles => {
    const { semanticColors, effects, fonts } = theme;

    const border = semanticColors.buttonBorder;
    const disabledBackground = semanticColors.disabledBackground;
    const disabledText = semanticColors.disabledText;
    const buttonHighContrastFocus = {
      left: -2,
      top: -2,
      bottom: -2,
      right: -2,
      border: 'none',
      outlineColor: 'ButtonText'
    };

    return {
      root: [
        getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent' }),
        theme.fonts.medium,
        {
          boxSizing: 'border-box',
          border: '1px solid ' + border,
          userSelect: 'none',
          display: 'inline-block',
          textDecoration: 'none',
          textAlign: 'center',
          cursor: 'pointer',
          verticalAlign: 'top',
          padding: '0 16px',
          borderRadius: effects.roundedCorner2,

          selectors: {
            // IE11 workaround for preventing shift of child elements of a button when active.
            ':active > *': {
              position: 'relative',
              left: 0,
              top: 0
            }
          }
        }
      ],

      rootDisabled: [
        getFocusStyle(theme, { inset: 1, highContrastStyle: buttonHighContrastFocus, borderColor: 'transparent' }),
        {
          backgroundColor: disabledBackground,
          borderColor: disabledBackground,
          color: disabledText,
          cursor: 'default',
          pointerEvents: 'none',
          selectors: {
            ':hover': noOutline,
            ':focus': noOutline,
            [HighContrastSelector]: {
              color: 'grayText',
              borderColor: 'grayText'
            }
          }
        }
      ],

      iconDisabled: {
        color: disabledText
      },

      menuIconDisabled: {
        color: disabledText
      },

      flexContainer: {
        display: 'flex',
        height: '100%',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center'
      },
      description: {
        display: 'block'
      },

      textContainer: {
        flexGrow: 1,
        display: 'block'
      },

      icon: iconStyle(fonts.mediumPlus.fontSize),

      menuIcon: iconStyle(fonts.small.fontSize),

      label: {
        margin: '0 4px',
        lineHeight: '100%',
        display: 'block'
      },

      screenReaderText: hiddenContentStyle
    };
  }
);
