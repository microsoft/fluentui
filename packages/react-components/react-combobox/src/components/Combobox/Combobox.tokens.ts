import { tokens } from '@fluentui/react-theme';

export const comboboxGroupTokens = {
  comboboxBorderRadius: `var(--comboboxBorderRadius, ${tokens.borderRadiusMedium})`,
  comboboxForegroundColor: `var(--comboboxForegroundColor, ${tokens.colorNeutralForeground1})`,
  comboboxPlaceholderForegroundColor: `var(--comboboxPlaceholderForegroundColor, ${tokens.colorNeutralForeground2})`,

  comboboxBottomBorderColorRest: `var(--comboboxBottomBorderColorRest, ${tokens.colorCompoundBrandStroke})`,
  comboboxBottomBorderColorPressed: `var(--comboboxBottomBorderColorPressed, ${tokens.colorCompoundBrandStrokePressed})`,

  comboboxOutlineBackgroundColorRest: `var(--comboboxOutlineBackgroundColorRest, ${tokens.colorNeutralBackground1})`,
  comboboxOutlineBorderColorRest: `var(--comboboxOutlineBorderColorRest, ${tokens.colorNeutralStroke1})`,
  comboboxOutlineBorderColorHover: `var(--comboboxOutlineBorderColorHover, ${tokens.colorNeutralStroke1Hover})`,
  comboboxOutlineBorderColorPressed: `var(--comboboxOutlineBorderColorPressed, ${tokens.colorNeutralStroke1Pressed})`,
  comboboxOutlineBottomBorderColor: `var(--comboboxOutlineBottomBorderColor, ${tokens.colorNeutralStrokeAccessible})`,

  comboboxUnderlineBackgroundColor: `var(--comboboxUnderlineBackgroundColor, ${tokens.colorTransparentBackground})`,
  comboboxUnderlineBottomBorderColor: `var(--comboboxUnderlineBottomBorderColor, ${tokens.colorNeutralStrokeAccessible})`,
};

export const comboboxTokens = {
  ctrlComboboxBorderRadius: `var(--ctrlComboboxBorderRadius,${comboboxGroupTokens.comboboxBorderRadius})`,
  ctrlComboboxForegroundColor: `var(--ctrlComboboxForegroundColor,${comboboxGroupTokens.comboboxForegroundColor})`,
  ctrlComboboxPlaceholderForegroundColor: `var(--ctrlComboboxPlaceholderForegroundColor,${comboboxGroupTokens.comboboxPlaceholderForegroundColor})`,

  ctrlComboboxBottomBorderColorRest: `var(--ctrlComboboxBottomBorderColorRest,${comboboxGroupTokens.comboboxBottomBorderColorRest})`,
  ctrlComboboxBottomBorderColorPressed: `var(--ctrlComboboxBottomBorderColorPressed,${comboboxGroupTokens.comboboxBottomBorderColorPressed})`,

  ctrlComboboxOutlineBackgroundColorRest: `var(--ctrlComboboxOutlineBackgroundColorRest,${comboboxGroupTokens.comboboxOutlineBackgroundColorRest})`,
  ctrlComboboxOutlineBorderColorRest: `var(--ctrlComboboxOutlineBorderColorRest,${comboboxGroupTokens.comboboxOutlineBorderColorRest})`,
  ctrlComboboxOutlineBorderColorHover: `var(--ctrlComboboxOutlineBorderColorHover, ${comboboxGroupTokens.comboboxOutlineBorderColorHover})`,
  ctrlComboboxOutlineBorderColorPressed: `var(--ctrlComboboxOutlineBorderColorPressed, ${comboboxGroupTokens.comboboxOutlineBorderColorPressed})`,
  ctrlComboboxOutlineBottomBorderColor: `var(--ctrlComboboxOutlineBottomBorderColor, ${comboboxGroupTokens.comboboxOutlineBottomBorderColor})`,

  ctrlComboboxUnderlineBackgroundColor: `var(--ctrlComboboxUnderlineBackgroundColor, ${comboboxGroupTokens.comboboxUnderlineBackgroundColor})`,
  ctrlComboboxUnderlineBottomBorderColor: `var(--ctrlComboboxUnderlineBottomBorderColor, ${comboboxGroupTokens.comboboxUnderlineBottomBorderColor})`,
};
