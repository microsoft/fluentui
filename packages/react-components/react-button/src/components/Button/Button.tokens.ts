import { tokens } from '@fluentui/react-theme';

export const buttonGroupTokens = {
  // Default
  buttonBorderRadius: `var(--buttonBorderRadius, ${tokens.borderRadiusMedium})`,
  buttonFontFamily: `var(--buttonFontFamily,${tokens.fontFamilyBase})`,

  // Secondary
  buttonSecondaryBackgroundColorRest: `var(--buttonBackgroundColorRest,${tokens.colorNeutralBackground1})`,
  buttonSecondaryBorderColorRest: `var(--buttonBorderColorRest,${tokens.colorNeutralStroke1})`,
  buttonSecondaryForegroundColorRest: `var(--buttonForegroundColorRest,${tokens.colorNeutralForeground1})`,

  buttonSecondaryBackgroundColorHover: `var(--buttonBackgroundColorHover,${tokens.colorNeutralBackground1Hover})`,
  buttonSecondaryBorderColorHover: `var(--buttonBorderColorHover,${tokens.colorNeutralStroke1Hover})`,
  buttonSecondaryForegroundColorHover: `var(--buttonForegroundColorHover,${tokens.colorNeutralForeground1Hover})`,

  buttonSecondaryBackgroundColorPressed: `var(--buttonBackgroundColorPressed,${tokens.colorNeutralBackground1Pressed})`,
  buttonSecondaryBorderColorPressed: `var(--buttonBorderColorPressed,${tokens.colorNeutralStroke1Pressed})`,
  buttonSecondaryForegroundColorPressed: `var(--buttonForegroundColorPressed,${tokens.colorNeutralForeground1Pressed})`,

  // Primary
  buttonPrimaryBackgroundColorRest: `var(--buttonPrimaryBackgroundColorRest,${tokens.colorBrandBackground})`,
  buttonPrimaryForegroundColorRest: `var(--buttonPrimaryForegroundColorRest,${tokens.colorNeutralForegroundOnBrand})`,

  buttonPrimaryBackgroundColorHover: `var(--buttonPrimaryBackgroundColorHover,${tokens.colorBrandBackgroundHover})`,
  buttonPrimaryForegroundColorHover: `var(--buttonPrimaryForegroundColorHover,${tokens.colorNeutralForegroundOnBrand})`,

  buttonPrimaryBackgroundColorPressed: `var(--buttonPrimaryBackgroundColorPressed,${tokens.colorBrandBackgroundPressed})`,
  buttonPrimaryForegroundColorPressed: `var(--buttonPrimaryForegroundColorPressed,${tokens.colorNeutralForegroundOnBrand})`,

  // Outline
  buttonOutlineBackgroundColorRest: `var(--buttonOutlineBackgroundColorRest,${tokens.colorTransparentBackground})`,
  buttonOutlineBackgroundColorHover: `var(--buttonOutlineBackgroundColorHover,${tokens.colorTransparentBackgroundHover})`,
  buttonOutlineBackgroundColorPressed: `var(--buttonOutlineBackgroundColorPressed,${tokens.colorTransparentBackgroundPressed})`,

  // Subtle
  buttonSubtleBackgroundColorRest: `var(--buttonSubtleBackgroundColorRest,${tokens.colorSubtleBackground})`,
  buttonSubtleForegroundColorRest: `var(--buttonSubtleForegroundColorRest,${tokens.colorNeutralForeground2})`,

  buttonSubtleBackgroundColorHover: `var(--buttonSubtleBackgroundColorHover,${tokens.colorSubtleBackgroundHover})`,
  buttonSubtleForegroundColorHover: `var(--buttonSubtleForegroundColorHover,${tokens.colorNeutralForeground2Hover})`,

  buttonSubtleBackgroundColorPressed: `var(--buttonSubtleBackgroundColorPressed,${tokens.colorSubtleBackgroundPressed})`,
  buttonSubtleForegroundColorPressed: `var(--buttonSubtleForegroundColorPressed,${tokens.colorNeutralForeground2Pressed})`,

  // Transparent
  buttonTransparentBackgroundColorRest: `var(--buttonTransparentBackgroundColorRest,${tokens.colorTransparentBackground})`,
  buttonTransparentForegroundColorRest: `var(--buttonTransparentForegroundColorRest,${tokens.colorNeutralForeground2})`,

  buttonTransparentBackgroundColorHover: `var(--buttonTransparentBackgroundColorHover,${tokens.colorTransparentBackgroundHover})`,
  buttonTransparentForegroundColorHover: `var(--buttonTransparentForegroundColorHover,${tokens.colorNeutralForeground2BrandHover})`,

  buttonTransparentBackgroundColorPressed: `var(--buttonTransparentBackgroundColorPressed,${tokens.colorTransparentBackgroundPressed})`,
  buttonTransparentForegroundColorPressed: `var(--buttonTransparentForegroundColorPressed,${tokens.colorNeutralForeground2BrandPressed})`,
};

export const buttonTokens = {
  // Default
  ctrlButtonBorderRadius: `var(--ctrlButtonBorderRadius, ${buttonGroupTokens.buttonBorderRadius})`,
  ctrlButtonFontFamily: `var(--ctrlButtonFontFamily,${buttonGroupTokens.buttonFontFamily})`,

  // Secondary
  ctrlButtonSecondaryBackgroundColorRest: `var(--ctrlButtonSecondaryBackgroundColorRest,${buttonGroupTokens.buttonSecondaryBackgroundColorRest})`,
  ctrlButtonSecondaryBorderColorRest: `var(--ctrlButtonSecondaryBorderColorRest,${buttonGroupTokens.buttonSecondaryBorderColorRest})`,
  ctrlButtonSecondaryForegroundColorRest: `var(--ctrlButtonSecondaryForegroundColorRest,${buttonGroupTokens.buttonSecondaryForegroundColorRest})`,

  ctrlButtonSecondaryBackgroundColorHover: `var(--ctrlButtonSecondaryBackgroundColorHover,${buttonGroupTokens.buttonSecondaryBackgroundColorHover})`,
  ctrlButtonSecondaryBorderColorHover: `var(--ctrlButtonSecondaryBorderColorHover,${buttonGroupTokens.buttonSecondaryBorderColorHover})`,
  ctrlButtonSecondaryForegroundColorHover: `var(--ctrlButtonSecondaryForegroundColorHover,${buttonGroupTokens.buttonSecondaryForegroundColorHover})`,

  ctrlButtonSecondaryBackgroundColorPressed: `var(--ctrlButtonSecondaryBackgroundColorPressed,${buttonGroupTokens.buttonSecondaryBackgroundColorPressed})`,
  ctrlButtonSecondaryBorderColorPressed: `var(--ctrlButtonSecondaryBorderColorPressed,${buttonGroupTokens.buttonSecondaryBorderColorPressed})`,
  ctrlButtonSecondaryForegroundColorPressed: `var(--ctrlButtonSecondaryForegroundColorPressed,${buttonGroupTokens.buttonSecondaryForegroundColorPressed})`,

  // Primary
  ctrlButtonPrimaryBackgroundColorRest: `var(--ctrlButtonPrimaryBackgroundColorRest,${buttonGroupTokens.buttonPrimaryBackgroundColorRest})`,
  ctrlButtonPrimaryForegroundColorRest: `var(--ctrlButtonPrimaryForegroundColorRest,${buttonGroupTokens.buttonPrimaryForegroundColorRest})`,

  ctrlButtonPrimaryBackgroundColorHover: `var(--ctrlButtonPrimaryBackgroundColorHover,${buttonGroupTokens.buttonPrimaryBackgroundColorHover})`,
  ctrlButtonPrimaryForegroundColorHover: `var(--ctrlButtonPrimaryForegroundColorHover,${buttonGroupTokens.buttonPrimaryForegroundColorHover})`,

  ctrlButtonPrimaryBackgroundColorPressed: `var(--ctrlButtonPrimaryBackgroundColorPressed,${buttonGroupTokens.buttonPrimaryBackgroundColorPressed})`,
  ctrlButtonPrimaryForegroundColorPressed: `var(--ctrlButtonPrimaryForegroundColorPressed,${buttonGroupTokens.buttonPrimaryForegroundColorPressed})`,

  // Outline
  ctrlButtonOutlineBackgroundColorRest: `var(--ctrlButtonOutlineBackgroundColorRest,${buttonGroupTokens.buttonOutlineBackgroundColorRest})`,
  ctrlButtonOutlineBackgroundColorHover: `var(--ctrlButtonOutlineBackgroundColorHover,${buttonGroupTokens.buttonOutlineBackgroundColorHover})`,
  ctrlButtonOutlineBackgroundColorPressed: `var(--ctrlButtonOutlineBackgroundColorPressed,${buttonGroupTokens.buttonOutlineBackgroundColorPressed})`,

  // Subtle
  ctrlButtonSubtleBackgroundColorRest: `var(--ctrlButtonSubtleBackgroundColorRest,${buttonGroupTokens.buttonSubtleBackgroundColorRest})`,
  ctrlButtonSubtleForegroundColorRest: `var(--ctrlButtonSubtleForegroundColorRest,${buttonGroupTokens.buttonSubtleForegroundColorRest})`,

  ctrlButtonSubtleBackgroundColorHover: `var(--ctrlButtonSubtleBackgroundColorHover,${buttonGroupTokens.buttonSubtleBackgroundColorHover})`,
  ctrlButtonSubtleForegroundColorHover: `var(--ctrlButtonSubtleForegroundColorHover,${buttonGroupTokens.buttonSubtleForegroundColorHover})`,

  ctrlButtonSubtleBackgroundColorPressed: `var(--ctrlButtonSubtleBackgroundColorPressed,${buttonGroupTokens.buttonSubtleBackgroundColorPressed})`,
  ctrlButtonSubtleForegroundColorPressed: `var(--ctrlButtonSubtleForegroundColorPressed,${buttonGroupTokens.buttonSubtleForegroundColorPressed})`,

  // Transparent
  ctrlButtonTransparentBackgroundColorRest: `var(--ctrlButtonTransparentBackgroundColorRest,${buttonGroupTokens.buttonTransparentBackgroundColorRest})`,
  ctrlButtonTransparentForegroundColorRest: `var(--ctrlButtonTransparentForegroundColorRest,${buttonGroupTokens.buttonTransparentForegroundColorRest})`,

  ctrlButtonTransparentBackgroundColorHover: `var(--ctrlButtonTransparentBackgroundColorHover,${buttonGroupTokens.buttonTransparentBackgroundColorHover})`,
  ctrlButtonTransparentForegroundColorHover: `var(--ctrlButtonTransparentForegroundColorHover,${buttonGroupTokens.buttonTransparentForegroundColorHover})`,

  ctrlButtonTransparentBackgroundColorPressed: `var(--ctrlButtonTransparentBackgroundColorPressed,${buttonGroupTokens.buttonTransparentBackgroundColorPressed})`,
  ctrlButtonTransparentForegroundColorPressed: `var(--ctrlButtonTransparentForegroundColorPressed,${buttonGroupTokens.buttonTransparentForegroundColorPressed})`,
};
