import { tokens } from '@fluentui/react-theme';

export const buttonGroupTokens = {
  // colors
  buttonBackgroundColorRest: `var(--buttonBackgroundColorRest,${tokens.colorNeutralBackground1})`,
  buttonBorderColorRest: `var(--buttonBorderColorRest,${tokens.colorNeutralStroke1})`,
  buttonForegroundColorRest: `var(--buttonForegroundColorRest,${tokens.colorNeutralForeground1})`,

  buttonBackgroundColorHover: `var(--buttonBackgroundColorHover,${tokens.colorNeutralBackground1Hover})`,
  buttonBorderColorHover: `var(--buttonBorderColorHover,${tokens.colorNeutralStroke1Hover})`,
  buttonForegroundColorHover: `var(--buttonForegroundColorHover,${tokens.colorNeutralForeground1Hover})`,

  buttonBackgroundColorPressed: `var(--buttonBackgroundColorPressed,${tokens.colorNeutralBackground1Pressed})`,
  buttonBorderColorPressed: `var(--buttonBorderColorPressed,${tokens.colorNeutralStroke1Pressed})`,
  buttonForegroundColorPressed: `var(--buttonForegroundColorPressed,${tokens.colorNeutralForeground1Pressed})`,

  buttonPrimaryBackgroundColorRest: `var(--buttonPrimaryBackgroundColorRest,${tokens.colorBrandBackground})`,
  buttonPrimaryForegroundColorRest: `var(--buttonPrimaryForegroundColorRest,${tokens.colorNeutralForegroundOnBrand})`,

  buttonPrimaryBackgroundColorHover: `var(--buttonPrimaryBackgroundColorHover,${tokens.colorBrandBackgroundHover})`,
  buttonPrimaryForegroundColorHover: `var(--buttonPrimaryForegroundColorHover,${tokens.colorNeutralForegroundOnBrand})`,

  buttonPrimaryBackgroundColorPressed: `var(--buttonPrimaryBackgroundColorPressed,${tokens.colorBrandBackgroundPressed})`,
  buttonPrimaryForegroundColorPressed: `var(--buttonPrimaryForegroundColorPressed,${tokens.colorNeutralForegroundOnBrand})`,

  // typography
  buttonFontFamily: `var(--buttonFontFamily,${tokens.fontFamilyBase})`,
};

export const buttonTokens = {
  // colors
  ctrlButtonBackgroundColorRest: `var(--ctrlButtonBackgroundColorRest,${buttonGroupTokens.buttonBackgroundColorRest})`,
  ctrlButtonBorderColorRest: `var(--ctrlButtonBorderColorRest,${buttonGroupTokens.buttonBorderColorRest})`,
  ctrlButtonForegroundColorRest: `var(--ctrlButtonForegroundColorRest,${buttonGroupTokens.buttonForegroundColorRest})`,

  ctrlButtonBackgroundColorHover: `var(--ctrlButtonBackgroundColorHover,${buttonGroupTokens.buttonBackgroundColorHover})`,
  ctrlButtonBorderColorHover: `var(--ctrlButtonBorderColorHover,${buttonGroupTokens.buttonBorderColorHover})`,
  ctrlButtonForegroundColorHover: `var(--ctrlButtonForegroundColorHover,${buttonGroupTokens.buttonForegroundColorHover})`,

  ctrlButtonBackgroundColorPressed: `var(--ctrlButtonBackgroundColorPressed,${buttonGroupTokens.buttonBackgroundColorPressed})`,
  ctrlButtonBorderColorPressed: `var(--ctrlButtonBorderColorPressed,${buttonGroupTokens.buttonBorderColorPressed})`,
  ctrlButtonForegroundColorPressed: `var(--ctrlButtonForegroundColorPressed,${buttonGroupTokens.buttonForegroundColorPressed})`,

  ctrlButtonPrimaryBackgroundColorRest: `var(--ctrlButtonPrimaryBackgroundColorRest,${buttonGroupTokens.buttonPrimaryBackgroundColorRest})`,
  ctrlButtonPrimaryForegroundColorRest: `var(--ctrlButtonPrimaryForegroundColorRest,${buttonGroupTokens.buttonPrimaryForegroundColorRest})`,

  ctrlButtonPrimaryBackgroundColorHover: `var(--ctrlButtonPrimaryBackgroundColorHover,${buttonGroupTokens.buttonPrimaryBackgroundColorHover})`,
  ctrlButtonPrimaryForegroundColorHover: `var(--ctrlButtonPrimaryForegroundColorHover,${buttonGroupTokens.buttonPrimaryForegroundColorHover})`,

  ctrlButtonPrimaryBackgroundColorPressed: `var(--ctrlButtonPrimaryBackgroundColorPressed,${buttonGroupTokens.buttonPrimaryBackgroundColorPressed})`,
  ctrlButtonPrimaryForegroundColorPressed: `var(--ctrlButtonPrimaryForegroundColorPressed,${buttonGroupTokens.buttonPrimaryForegroundColorPressed})`,

  // typography
  ctrlButtonFontFamily: `var(--ctrlButtonFontFamily,${buttonGroupTokens.buttonFontFamily})`,
};
