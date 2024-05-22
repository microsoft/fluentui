import { tokens } from '@fluentui/react-theme';

export const switchGroupTokens = {
  switchBorderColorRest: `var(--switchBorderColorRest,${tokens.colorNeutralStrokeAccessible})`,
  switchBorderColorHover: `var(--switchBorderColorHover,${tokens.colorNeutralStrokeAccessibleHover})`,
  switchBorderColorPressed: `var(--switchBorderColorPressed,${tokens.colorNeutralStrokeAccessiblePressed})`,

  switchBorderColorCheckedRest: `var(--switchBorderColorCheckedRest,${tokens.colorTransparentStroke})`,
  switchBorderColorCheckedHover: `var(--switchBorderColorCheckedHover,${tokens.colorTransparentStrokeInteractive})`,
  switchBorderColorCheckedPressed: `var(--switchBorderColorCheckedPressed,${tokens.colorTransparentStrokeInteractive})`,

  switchIndicatorForegroundColorRest: `var(--switchIndicatorForegroundColorRest,${tokens.colorNeutralStrokeAccessible})`,
  switchIndicatorForegroundColorHover: `var(--switchIndicatorForegroundColorHover,${tokens.colorNeutralStrokeAccessibleHover})`,
  switchIndicatorForegroundColorPressed: `var(--switchIndicatorForegroundColorPressed,${tokens.colorNeutralStrokeAccessiblePressed})`,

  switchIndicatorForegroundColorCheckedRest: `var(--switchIndicatorForegroundColorCheckedRest,${tokens.colorNeutralForegroundInverted})`,
  switchIndicatorBackgroundColorCheckedRest: `var(--switchIndicatorBackgroundColorCheckedRest,${tokens.colorCompoundBrandBackground})`,

  switchIndicatorBackgroundColorCheckedHover: `var(--switchIndicatorBackgroundColorCheckedHover,${tokens.colorCompoundBrandBackgroundHover})`,

  switchIndicatorBackgroundColorCheckedPressed: `var(--switchIndicatorBackgroundColorCheckedPressed,${tokens.colorCompoundBrandBackgroundPressed})`,
};

export const switchTokens = {
  ctrlSwitchBorderColorRest: `var(--ctrlSwitchBorderColorRest,${switchGroupTokens.switchBorderColorRest})`,
  ctrlSwitchBorderColorHover: `var(--ctrlSwitchBorderColorHover,${switchGroupTokens.switchBorderColorHover})`,
  ctrlSwitchBorderColorPressed: `var(--ctrlSwitchBorderColorPressed,${switchGroupTokens.switchBorderColorPressed})`,

  ctrlSwitchBorderColorCheckedRest: `var(--ctrlSwitchBorderColorCheckedRest,${switchGroupTokens.switchBorderColorCheckedRest})`,
  ctrlSwitchBorderColorCheckedHover: `var(--ctrlSwitchBorderColorCheckedHover,${switchGroupTokens.switchBorderColorCheckedHover})`,
  ctrlSwitchBorderColorCheckedPressed: `var(--ctrlSwitchBorderColorCheckedPressed,${switchGroupTokens.switchBorderColorCheckedPressed})`,

  ctrlSwitchIndicatorForegroundColorRest: `var(--ctrlSwitchIndicatorForegroundColorRest,${switchGroupTokens.switchIndicatorForegroundColorRest})`,
  ctrlSwitchIndicatorForegroundColorHover: `var(--ctrlSwitchIndicatorForegroundColorHover,${switchGroupTokens.switchIndicatorForegroundColorHover})`,
  ctrlSwitchIndicatorForegroundColorPressed: `var(--ctrlSwitchIndicatorForegroundColorPressed,${switchGroupTokens.switchIndicatorForegroundColorPressed})`,

  ctrlSwitchIndicatorForegroundColorCheckedRest: `var(--ctrlSwitchIndicatorForegroundColorCheckedRest,${switchGroupTokens.switchIndicatorForegroundColorCheckedRest})`,
  ctrlSwitchIndicatorBackgroundColorCheckedRest: `var(--ctrlSwitchIndicatorBackgroundColorCheckedRest,${switchGroupTokens.switchIndicatorBackgroundColorCheckedRest})`,

  ctrlSwitchIndicatorBackgroundColorCheckedHover: `var(--ctrlSwitchIndicatorBackgroundColorCheckedHover,${switchGroupTokens.switchIndicatorBackgroundColorCheckedHover})`,

  ctrlSwitchIndicatorBackgroundColorCheckedPressed: `var(--ctrlSwitchIndicatorBackgroundColorCheckedPressed,${switchGroupTokens.switchIndicatorBackgroundColorCheckedPressed})`,
};
