import { IButtonComponent } from './Button.types';
import { getFocusStyle, getGlobalClassNames } from '../../Styling';

const baseTokens: IButtonComponent['tokens'] = (props, theme) => {
  return {
    borderRadius: 0,
    borderWidth: 0,
    minWidth: 100,
    minHeight: 32,
    lineHeight: 1,
    contentPadding: '8px 16px',
    textFamily: 'default',
    textSize: 14,
    iconSize: 14,
    iconWeight: 400
  };
};

const circularTokens: IButtonComponent['tokens'] = (props, theme) => {
  return {
    borderRadius: '50%',
    borderWidth: 1,
    minWidth: 32,
    minHeight: 32,
    contentPadding: ''
  };
};

const enabledTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackground,
    backgroundColorHovered: semanticColors.buttonBackgroundHovered,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,

    iconColor: semanticColors.buttonText,
    iconColorHovered: semanticColors.buttonTextHovered,
    iconColorPressed: semanticColors.buttonTextPressed,

    color: semanticColors.buttonText,
    colorHovered: semanticColors.buttonTextHovered,
    colorPressed: semanticColors.buttonTextPressed,

    borderColor: semanticColors.buttonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: theme.semanticColors.buttonBackgroundDisabled,
    backgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    backgroundColorPressed: semanticColors.buttonBackgroundDisabled,

    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled,

    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,
    color: semanticColors.buttonTextDisabled,

    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled
  };
};

const expandedTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundPressed,
    backgroundColorHovered: semanticColors.buttonBackgroundPressed,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,

    color: semanticColors.buttonTextPressed,
    colorHovered: semanticColors.buttonTextPressed,
    colorPressed: semanticColors.buttonTextPressed
  };
};

const primaryEnabledTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundHovered,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    color: semanticColors.primaryButtonText,
    colorHovered: semanticColors.primaryButtonTextHovered,
    colorPressed: semanticColors.primaryButtonTextPressed,

    iconColor: semanticColors.primaryButtonText,
    iconColorHovered: semanticColors.primaryButtonTextHovered,
    iconColorPressed: semanticColors.primaryButtonTextPressed,

    borderColor: semanticColors.primaryButtonBorder
  };
};

const primaryExpandedTokens: IButtonComponent['tokens'] = (props, theme) => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    color: semanticColors.primaryButtonTextPressed,
    colorHovered: semanticColors.primaryButtonTextPressed,
    colorPressed: semanticColors.primaryButtonTextPressed
  };
};

export const ButtonTokens: IButtonComponent['tokens'] = (props, theme) => [
  baseTokens,
  !props.disabled && enabledTokens,
  props.expanded && expandedTokens,
  props.primary && primaryEnabledTokens,
  props.primary && props.expanded && primaryExpandedTokens,
  props.circular && circularTokens,
  props.disabled && disabledTokens
];

export const ButtonStyles: IButtonComponent['styles'] = (props, theme, tokens) => {
  const { className } = props;

  const globalClassNames = getGlobalClassNames(
    {
      icon: 'ms-Icon'
    },
    theme,
    true
  );

  return {
    root: [
      getFocusStyle(theme),
      theme.fonts.medium,
      {
        backgroundColor: tokens.backgroundColor,
        borderColor: tokens.borderColor,
        borderRadius: tokens.borderRadius,
        borderStyle: 'solid',
        borderWidth: tokens.borderWidth,
        boxSizing: 'border-box',
        color: tokens.color,
        cursor: 'default',
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

        selectors: {
          ':hover': {
            backgroundColor: tokens.backgroundColorHovered,
            color: tokens.colorHovered,
            borderColor: tokens.borderColorHovered
          },
          ':hover:active': {
            backgroundColor: tokens.backgroundColorPressed,
            color: tokens.colorPressed,
            borderColor: tokens.borderColorPressed
          },
          [`:hover .${globalClassNames.icon}`]: {
            color: tokens.iconColorHovered
          },
          [`:hover:active .${globalClassNames.icon}`]: {
            color: tokens.iconColorPressed
          }
        }
      },
      className
    ],
    stack: {
      padding: tokens.contentPadding,
      height: '100%'
    },
    icon: [
      {
        display: 'flex',
        fontSize: tokens.iconSize,
        color: tokens.iconColor,
        fill: tokens.iconColor,
        // tslint:disable-next-line:no-any
        fontWeight: tokens.iconWeight as any
      },
      globalClassNames.icon
    ],
    content: {
      overflow: 'visible'
    },
    menuIcon: {
      color: tokens.iconColor
    },
    splitContainer: {
      height: '100%',
      position: 'relative',
      width: '36px'
    },
    divider: {
      background: tokens.color,
      bottom: 6,
      display: 'inline-block',
      left: 0,
      opacity: 0.7,
      position: 'absolute',
      top: 6,
      width: 1
    }
  };
};
