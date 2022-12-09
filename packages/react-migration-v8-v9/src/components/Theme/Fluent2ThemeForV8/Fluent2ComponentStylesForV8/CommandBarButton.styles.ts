import type { IButtonProps, IButtonStyles, IStyleFunctionOrObject, ITheme } from '@fluentui/react';

export function getCommandBarButtonStyles(props: IButtonProps): IStyleFunctionOrObject<IButtonProps, IButtonStyles> {
  const { theme } = props;
  const { semanticColors, effects } = theme!;

  const rightCorners = {
    borderRadius: 0,
    borderTopRightRadius: effects.roundedCorner4,
    borderBottomRightRadius: effects.roundedCorner4,
  };

  const leftCorners = {
    borderRadius: 0,
    borderTopLeftRadius: effects.roundedCorner4,
    borderBottomLeftRadius: effects.roundedCorner4,
  };

  const commandBarHeightPadding = {
    height: 32,
    paddingLeft: 4,
    paddingRight: 4,
  };

  const defaultSplitStyles: Partial<IButtonStyles> = getSplitButtonStyles(theme!);

  const styles: Partial<IButtonStyles> = {
    root: {
      backgroundColor: 'transparent',
      height: '100%',
      padding: '0px',
      margin: '0px 2px',
      borderRadius: effects.roundedCorner4,
      '.ms-Fabric--isFocusVisible &:focus::after': {
        top: 4,
        right: 0,
        bottom: 4,
        left: 0,
        outline: 'none',
        borderRadius: effects.roundedCorner4,
        border: `2px solid ${semanticColors.focusBorder}`,
      },
    },
    rootHovered: {
      backgroundColor: 'transparent',
      '.ms-Button-flexContainer': {
        backgroundColor: semanticColors.buttonBackgroundHovered,
      },
    },
    rootPressed: {
      backgroundColor: 'transparent',
      '.ms-Button-flexContainer': {
        backgroundColor: semanticColors.buttonBackgroundPressed,
      },
    },
    rootExpanded: {
      backgroundColor: 'transparent',
      color: 'inherit',
      '.ms-Button-flexContainer': {
        backgroundColor: 'transparent',
      },
    },
    rootChecked: {
      backgroundColor: 'transparent',
      '.ms-Button-flexContainer': {
        backgroundColor: semanticColors.buttonBackgroundChecked,
      },
    },
    rootCheckedHovered: {
      backgroundColor: 'transparent',
      '.ms-Button-flexContainer': {
        backgroundColor: semanticColors.buttonBackgroundCheckedHovered,
      },
    },
    rootCheckedPressed: {
      backgroundColor: 'transparent',
      '.ms-Button-flexContainer': {
        backgroundColor: semanticColors.buttonBackgroundPressed,
      },
    },
    rootExpandedHovered: {
      backgroundColor: 'transparent',
      '.ms-Button-flexContainer': {
        backgroundColor: semanticColors.buttonBackgroundHovered,
      },
    },
    flexContainer: {
      height: 32,
      paddingLeft: 4,
      paddingRight: 4,
      borderRadius: effects.roundedCorner4,
    },
    icon: {
      color: 'inherit',
    },
    menuIcon: {
      color: 'inherit',
      fontSize: '10px',
    },
    rootDisabled: {
      backgroundColor: 'transparent',
    },
    textContainer: {
      height: 16,
    },
    ...defaultSplitStyles,
    splitButtonContainer: {
      borderRadius: effects.roundedCorner4,
      color: semanticColors.buttonText,
      '.ms-Button:first-child': {
        '.ms-Button-flexContainer': {
          ...leftCorners,
          ...commandBarHeightPadding,
        },
      },
    },
    splitButtonMenuButton: {
      ...rightCorners,
      height: '100%',
      padding: '0px',
      width: 20,
      marginLeft: '-2px',
      backgroundColor: 'transparent',
      '.ms-Button-flexContainer': {
        ...rightCorners,
        ...commandBarHeightPadding,
      },
      '&:hover': {
        backgroundColor: 'transparent',
        '.ms-Button-flexContainer': {
          backgroundColor: semanticColors.buttonBackgroundHovered,
        },
      },
    },
    splitButtonContainerFocused: {
      ':focus::after': {
        inset: `4px 0px`,
        outline: `none`,
        borderRadius: effects.roundedCorner4,
        border: `2px solid ${semanticColors.focusBorder}`,
      },
    },
    splitButtonMenuButtonExpanded: {
      backgroundColor: 'transparent',
      '.ms-Button-flexContainer': {
        backgroundColor: semanticColors.buttonBackgroundChecked,
      },
      '&:hover': {
        backgroundColor: 'transparent',
        '.ms-Button-flexContainer': {
          backgroundColor: semanticColors.buttonBackgroundCheckedHovered,
        },
      },
    },
    splitButtonFlexContainer: {
      border: 'none',
    },
  };

  return styles;
}

// This function will be moved to Button.styles.ts in another PR to add default split button styling
function getSplitButtonStyles(theme: ITheme): Partial<IButtonStyles> {
  const { effects, semanticColors } = theme;

  const rightCorners = {
    borderRadius: 0,
    borderTopRightRadius: effects.roundedCorner4,
    borderBottomRightRadius: effects.roundedCorner4,
  };

  const leftCorners = {
    borderRadius: 0,
    borderTopLeftRadius: effects.roundedCorner4,
    borderBottomLeftRadius: effects.roundedCorner4,
  };

  const styles: Partial<IButtonStyles> = {
    splitButtonContainer: {
      borderRadius: effects.roundedCorner4,
      color: semanticColors.buttonText,
      '.ms-Button:first-child': {
        ...leftCorners,
        height: '100%',
      },
      '.ms-Button--primary:hover': {
        border: `none`,
      },
    },
    splitButtonMenuButton: {
      ...rightCorners,
      height: '100%',
      padding: '0px',
      width: 20,
    },
    splitButtonContainerFocused: {
      ':focus::after': {
        inset: '0px',
        outline: `none`,
        borderRadius: effects.roundedCorner4,
        border: `2px solid ${semanticColors.focusBorder}`,
      },
    },
    splitButtonMenuFocused: {
      ':focus::after': {
        inset: '0px',
        outline: `none`,
        border: `2px solid ${semanticColors.focusBorder}`,
        ...rightCorners,
      },
    },
    splitButtonDivider: {
      right: 19,
    },
    splitButtonDividerDisabled: {
      right: 19,
    },
  };

  return styles;
}
