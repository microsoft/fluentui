import { getFocusStyle, HighContrastSelector } from '../../../Styling';
import { ISplitButtonComponent, ISplitButtonStylesReturnType, ISplitButtonTokenReturnType } from './SplitButton.types';

const baseTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { effects, semanticColors } = theme;
  return {
    backgroundColor: semanticColors.inputBackground,
    borderColor: semanticColors.buttonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder,
    borderRadius: effects.roundedCorner2,
    borderWidth: 1,
    color: semanticColors.buttonText,
    contentPadding: '0px 19px',
    dividerColor: semanticColors.menuDivider,
    minHeight: 35,
    minWidth: 0
  };
};

const primaryTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    borderWidth: 0,
    color: semanticColors.primaryButtonText,
    highContrastColor: 'Window'
  };
};

const disabledTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundDisabled,
    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled,
    color: semanticColors.disabledText,
    highContrastColor: 'GrayText'
  };
};

export const SplitButtonTokens: ISplitButtonComponent['tokens'] = (props, theme): ISplitButtonTokenReturnType => [
  baseTokens,
  props.primary && primaryTokens,
  (props.primaryActionDisabled || props.disabled) && disabledTokens
];

export const SplitButtonStyles: ISplitButtonComponent['styles'] = (props, theme, tokens): ISplitButtonStylesReturnType => {
  return {
    root: [
      {
        borderRadius: tokens.borderRadius,
        boxSizing: 'border-box',

        selectors: {
          ':hover': {
            borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorHovered
          },
          ':active': {
            borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorPressed
          },
          [HighContrastSelector]: {
            borderColor: 'transparent'
          }
        }
      },
      getFocusStyle(theme),
      {
        backgroundColor: tokens.backgroundColor
      }
    ],
    button: {
      borderBottomLeftRadius: tokens.borderRadius,
      borderBottomRightRadius: '0px',
      borderTopLeftRadius: tokens.borderRadius,
      borderTopRightRadius: '0px',
      borderBottomWidth: tokens.borderWidth,
      borderLeftWidth: tokens.borderWidth,
      borderRightWidth: 0,
      borderTopWidth: tokens.borderWidth,
      minHeight: tokens.minHeight,
      minWidth: tokens.minWidth,

      selectors: {
        '> *': {
          padding: tokens.contentPadding
        },
        ':hover': {
          borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorHovered
        },
        ':active': {
          borderColor: props.primaryActionDisabled ? 'transparent' : tokens.borderColorPressed
        }
      }
    },
    splitDivider: {
      backgroundClip: 'content-box',
      backgroundColor: tokens.dividerColor,
      borderBottomColor: tokens.borderColor,
      borderTopColor: tokens.borderColor,
      borderStyle: 'solid',
      borderBottomWidth: tokens.borderWidth,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: tokens.borderWidth,
      boxSizing: 'border-box',
      height: '100%',
      padding: '7px 0px',
      width: 1,

      selectors: {
        [HighContrastSelector]: {
          borderColor: tokens.highContrastColor
        },
        ':hover': {
          borderColor: tokens.borderColorHovered
        },
        ':active': {
          borderColor: tokens.borderColorPressed
        }
      }
    },
    menuButton: {
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: tokens.borderRadius as string,
      borderTopLeftRadius: '0px',
      borderTopRightRadius: tokens.borderRadius as string,
      borderStyle: 'solid',
      borderBottomWidth: tokens.borderWidth,
      borderLeftWidth: 0,
      borderRightWidth: tokens.borderWidth,
      borderTopWidth: tokens.borderWidth,
      boxSizing: 'border-box',
      height: '100%',

      selectors: {
        '> *': {
          padding: '0px 10px'
        }
      }
    }
  };
};
