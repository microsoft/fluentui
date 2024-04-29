import { tokens } from '@fluentui/react-theme';

export const buttonGroupTokens = {
  // colors
  buttonBackgroundColorRest: `var(--buttonBackgroundColorRest,${tokens.colorNeutralBackground1})`,
  buttonBackgroundColorHover: `var(--buttonBackgroundColorHover,${tokens.colorNeutralBackground1Hover})`,
  buttonBackgroundColorPressed: `var(--buttonBackgroundColorPressed,${tokens.colorNeutralBackground1Pressed})`,

  buttonForegroundColorRest: `var(--buttonForegroundColorRest,${tokens.colorNeutralForeground1})`,
  buttonForegroundColorHover: `var(--buttonForegroundColorHover,${tokens.colorNeutralForeground1Hover})`,
  buttonForegroundColorPressed: `var(--buttonForegroundColorPressed,${tokens.colorNeutralForeground1Pressed})`,

  buttonBorderColorRest: `var(--buttonBorderColorRest,${tokens.colorNeutralStroke1})`,
  buttonBorderColorHover: `var(--buttonBorderColorHover,${tokens.colorNeutralStroke1Hover})`,
  buttonBorderColorPressed: `var(--buttonBorderColorPressed,${tokens.colorNeutralStroke1Pressed})`,

  // typography
  buttonFontFamily: `var(--buttonFontFamily,${tokens.fontFamilyBase})`,
};

export const buttonTokens = {
  // colors
  ctrlButtonBackgroundColorRest: `var(--ctrlButtonBackgroundColorRest,${buttonGroupTokens.buttonBackgroundColorRest})`,
  ctrlButtonBackgroundColorHover: `var(--ctrlButtonBackgroundColorHover,${buttonGroupTokens.buttonBackgroundColorHover})`,
  ctrlButtonBackgroundColorPressed: `var(--ctrlButtonBackgroundColorPressed,${buttonGroupTokens.buttonBackgroundColorPressed})`,

  ctrlButtonForegroundColorRest: `var(--ctrlButtonForegroundColorRest,${buttonGroupTokens.buttonForegroundColorRest})`,
  ctrlButtonForegroundColorHover: `var(--ctrlButtonForegroundColorHover,${buttonGroupTokens.buttonForegroundColorHover})`,
  ctrlButtonForegroundColorPressed: `var(--ctrlButtonForegroundColorPressed,${buttonGroupTokens.buttonForegroundColorPressed})`,

  ctrlButtonBorderColorRest: `var(--ctrlButtonBorderColorRest,${buttonGroupTokens.buttonBorderColorRest})`,
  ctrlButtonBorderColorHover: `var(--ctrlButtonBorderColorHover,${buttonGroupTokens.buttonBorderColorHover})`,
  ctrlButtonBorderColorPressed: `var(--ctrlButtonBorderColorPressed,${buttonGroupTokens.buttonBorderColorPressed})`,

  // typography
  ctrlButtonFontFamily: `var(--ctrlButtonFontFamily,${buttonGroupTokens.buttonFontFamily})`,
};
