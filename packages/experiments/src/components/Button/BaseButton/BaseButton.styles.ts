import { getFocusStyle, getGlobalClassNames, HighContrastSelector } from '../../../Styling';
import { IsFocusVisibleClassName } from '../../../Utilities';
import { IBaseButtonComponent, IBaseButtonStylesReturnType } from './BaseButton.types';

export const ButtonTokens: IBaseButtonComponent['tokens'] = {
  contentPadding: '1px 6px',
  textSize: 13.333
};

const GlobalClassNames = {
  msButton: 'ms-Button'
};

export const ButtonStyles: IBaseButtonComponent['styles'] = (props, theme, tokens): IBaseButtonStylesReturnType => {
  const { className, circular } = props;

  const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      globalClassNames.msButton,
      !circular && getFocusStyle(theme, { inset: 1, outlineColor: tokens.outlineColor }),
      circular && {
        selectors: {
          [`.${IsFocusVisibleClassName} &:focus`]: {
            borderWidth: 1
          }
        }
      },
      theme.fonts.medium,
      {
        backgroundColor: tokens.backgroundColor,
        borderColor: tokens.borderColor,
        borderRadius: tokens.borderRadius,
        borderStyle: tokens.borderStyle,
        borderWidth: tokens.borderWidth,
        boxSizing: 'border-box',
        color: tokens.color,
        cursor: tokens.cursor,
        display: 'inline-block',
        fontSize: tokens.textSize,
        fontWeight: tokens.textWeight,
        height: tokens.height,
        justifyContent: 'center',
        margin: 0,
        minWidth: tokens.minWidth,
        minHeight: tokens.minHeight,
        overflow: 'hidden',
        padding: 0,
        textDecoration: 'none',
        textAlign: 'center',
        userSelect: 'none',
        verticalAlign: 'baseline',
        width: tokens.width,
        outlineColor: tokens.outlineColor,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: tokens.highContrastBackgroundColor,
            borderColor: tokens.highContrastBorderColor,
            borderWidth: 1,
            color: tokens.highContrastColor,
            MsHighContrastAdjust: tokens.msHighContrastAdjust
          },
          ':hover': {
            backgroundColor: tokens.backgroundColorHovered,
            color: tokens.colorHovered,
            borderColor: tokens.borderColorHovered,

            selectors: {
              [HighContrastSelector]: {
                backgroundColor: tokens.highContrastBackgroundColorHovered,
                color: tokens.highContrastColorHovered,
                borderColor: tokens.highContrastBorderColorHovered
              }
            }
          },
          ':active': {
            backgroundColor: tokens.backgroundColorPressed,
            color: tokens.colorPressed,
            borderColor: tokens.borderColorPressed,

            selectors: {
              [HighContrastSelector]: {
                backgroundColor: tokens.highContrastBackgroundColorPressed,
                color: tokens.highContrastColorPressed,
                borderColor: tokens.highContrastBorderColorPressed
              }
            }
          },
          // We have this here to establish the focus style of circular Buttons. If we use getFocusStyle to get the focus style, then the
          // focus style for circular Buttons becomes busted, and the way to fix it is via the backgroundClip and padding attributes, which
          // we don't have access to via getFocusStyle.
          [`.${IsFocusVisibleClassName} &:focus`]: {
            borderColor: tokens.borderColorFocused,
            borderStyle: tokens.borderStyleFocused,
            borderWidth: tokens.borderWidthFocused,
            outlineColor: tokens.outlineColor,
            backgroundClip: tokens.backgroundClip,
            padding: tokens.contentPaddingFocused
          }
        }
      },
      className
    ],
    stack: {
      padding: tokens.contentPadding,
      height: '100%'
    }
  };
};
