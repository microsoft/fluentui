import { IButtonProps, IButtonStyles, IStyle, IStyleFunctionOrObject, ITheme } from '@fluentui/react';
import { concatStyleSets } from '@fluentui/react';

type FocusStyleType = {
  '.ms-Fabric--isFocusVisible &:focus::after': {
    border: string;
    borderRadius: string;
    inset: string;
    outline: string;
  };
};

const getFocusStyle = (borderColor: string, borderRadius: string, outlineColor: string): FocusStyleType => ({
  '.ms-Fabric--isFocusVisible &:focus::after': {
    border: `1px solid ${borderColor}`,
    borderRadius,
    inset: '1px',
    outline: `2px solid ${outlineColor}`,
  },
});

function getBaseButtonStyles(theme: ITheme): Partial<IButtonStyles> {
  const { effects } = theme;

  return {
    root: {
      paddingLeft: '12px',
      paddingRight: '12px',
      borderRadius: effects.roundedCorner4,
    },
  };
}

export function getStandardButtonStyles(theme: ITheme): Partial<IButtonStyles> {
  const { effects, palette, semanticColors } = theme;

  const styles: Partial<IButtonStyles> = {
    root: {
      borderColor: semanticColors.buttonBorder,
      color: semanticColors.buttonText,
      ...getFocusStyle('transparent', effects.roundedCorner2, semanticColors.focusBorder),
    },
    rootHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
      borderColor: palette.neutralTertiaryAlt,
      color: semanticColors.buttonTextHovered,
    },
    rootPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      borderColor: palette.neutralTertiary,
      color: semanticColors.buttonTextPressed,
    },
    rootDisabled: {
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      borderColor: semanticColors.buttonBorderDisabled,
      color: semanticColors.buttonTextDisabled,
    },
  };

  return styles;
}

export function getPrimaryButtonStyles(theme: ITheme): Partial<IButtonStyles> {
  const { effects, palette, semanticColors } = theme;

  const styles: Partial<IButtonStyles> = {
    root: {
      backgroundColor: semanticColors.primaryButtonBackground,
      borderColor: semanticColors.primaryButtonBorder,
      color: semanticColors.primaryButtonText,
      ...getFocusStyle(palette.white, effects.roundedCorner2, semanticColors.focusBorder),
    },
    rootHovered: {
      backgroundColor: semanticColors.primaryButtonBackgroundHovered,
      borderColor: semanticColors.primaryButtonBackgroundHovered,
      color: semanticColors.primaryButtonTextHovered,
    },
    rootPressed: {
      backgroundColor: semanticColors.primaryButtonBackgroundPressed,
      borderColor: semanticColors.primaryButtonBackgroundPressed,
      color: semanticColors.primaryButtonTextPressed,
    },
    rootDisabled: {
      backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      borderColor: semanticColors.primaryButtonBackgroundDisabled,
      color: semanticColors.primaryButtonTextDisabled,
    },
    description: {
      color: semanticColors.primaryButtonText,
    },
    descriptionHovered: {
      color: semanticColors.primaryButtonText,
    },
  };

  return styles;
}

export function getIconButtonStyles(props: IButtonProps): IStyleFunctionOrObject<IButtonProps, IButtonStyles> {
  const { theme } = props;
  const { effects, palette, semanticColors } = theme!;

  const styles: Partial<IButtonStyles> = {
    root: {
      borderColor: 'transparent',
      borderRadius: effects.roundedCorner4,
      color: palette.neutralPrimaryAlt,
      ...getFocusStyle('transparent', effects.roundedCorner2, semanticColors.focusBorder),
    },
    rootHovered: {
      backgroundColor: palette.neutralLighter,
      borderColor: palette.neutralLighter,
      color: semanticColors.buttonTextHovered,
    },
    rootPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      borderColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
    },
    rootDisabled: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: semanticColors.buttonTextDisabled,
    },
  };

  return styles;
}

export function getDefaultButtonStyles(props: IButtonProps): IStyleFunctionOrObject<IButtonProps, IButtonStyles> {
  const { theme, primary, split } = props;

  return concatStyleSets(
    getBaseButtonStyles(theme!),
    primary ? getPrimaryButtonStyles(theme!) : getStandardButtonStyles(theme!),
    split && getSplitButtonStyles(theme!),
  );
}

const fluent2SplitButtonDividerStyles: IStyle = {
  position: 'relative',
  top: 'unset',
  bottom: 'unset',
};

export function getSplitButtonStyles(theme: ITheme): Partial<IButtonStyles> {
  const styles: Partial<IButtonStyles> = {
    splitButtonMenuButton: {
      borderRadius: 'unset',
      borderTopRightRadius: theme?.effects.roundedCorner4,
      borderBottomRightRadius: theme?.effects.roundedCorner4,
    },
    splitButtonDivider: fluent2SplitButtonDividerStyles,
    splitButtonDividerDisabled: fluent2SplitButtonDividerStyles,
  };

  return styles;
}
