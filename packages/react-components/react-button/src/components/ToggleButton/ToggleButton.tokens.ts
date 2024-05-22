import { tokens } from '@fluentui/react-theme';

export const toggleButtonGroupTokens = {
  buttonSecondaryBackgroundColorSelected: `var(--buttonSecondaryBackgroundColorSelected, ${tokens.colorNeutralBackground1Selected})`,
  buttonSecondaryBorderColorSelected: `var(--buttonSecondaryBorderColorSelected, ${tokens.colorNeutralStroke1})`,
  buttonSecondaryForegroundColorSelected: `var(--buttonSecondaryForegroundColorSelected, ${tokens.colorNeutralForeground1Selected})`,

  buttonOutlineBackgroundColorSelected: `var(--buttonOutlineBackgroundColorSelected, ${tokens.colorTransparentBackgroundSelected})`,
  buttonOutlineBorderColorSelected: `var(--buttonOutlineBorderColorSelected, ${tokens.colorNeutralStroke1})`,

  buttonPrimaryBackgroundColorSelected: `var(--buttonPrimaryBackgroundColorSelected, ${tokens.colorBrandBackgroundSelected})`,
  buttonPrimaryForegroundColorSelected: `var(--buttonPrimaryForegroundColorSelected, ${tokens.colorNeutralForegroundOnBrand})`,

  buttonSubtleBackgroundColorSelected: `var(--buttonSubtleBackgroundColorSelected, ${tokens.colorSubtleBackgroundSelected})`,
  buttonSubtleForegroundColorSelected: `var(--buttonSubtleForegroundColorSelected, ${tokens.colorNeutralForeground2Selected})`,

  buttonTransparentBackgroundColorSelected: `var(--buttonTransparentBackgroundColorSelected, ${tokens.colorTransparentBackgroundSelected})`,
  buttonTransparentForegroundColorSelected: `var(--buttonTransparentForegroundColorSelected, ${tokens.colorNeutralForeground2Selected})`,
};

export const toggleButtonTokens = {
  ctrlButtonSecondaryBackgroundColorSelected: `var(--ctrlButtonSecondaryBackgroundColorSelected, ${toggleButtonGroupTokens.buttonSecondaryBackgroundColorSelected})`,
  ctrlButtonSecondaryBorderColorSelected: `var(--ctrlButtonSecondaryBorderColorSelected, ${toggleButtonGroupTokens.buttonSecondaryBorderColorSelected})`,
  ctrlButtonSecondaryForegroundColorSelected: `var(--ctrlButtonSecondaryForegroundColorSelected, ${toggleButtonGroupTokens.buttonSecondaryForegroundColorSelected})`,

  ctrlButtonOutlineBackgroundColorSelected: `var(--ctrlButtonOutlineBackgroundColorSelected, ${toggleButtonGroupTokens.buttonOutlineBackgroundColorSelected})`,
  ctrlButtonOutlineBorderColorSelected: `var(--ctrlButtonOutlineBorderColorSelected, ${toggleButtonGroupTokens.buttonOutlineBorderColorSelected})`,

  ctrlButtonPrimaryBackgroundColorSelected: `var(--ctrlButtonPrimaryBackgroundColorSelected, ${toggleButtonGroupTokens.buttonPrimaryBackgroundColorSelected})`,
  ctrlButtonPrimaryForegroundColorSelected: `var(--ctrlButtonPrimaryForegroundColorSelected, ${toggleButtonGroupTokens.buttonPrimaryForegroundColorSelected})`,

  ctrlButtonSubtleBackgroundColorSelected: `var(--ctrlButtonSubtleBackgroundColorSelected, ${toggleButtonGroupTokens.buttonSubtleBackgroundColorSelected})`,
  ctrlButtonSubtleForegroundColorSelected: `var(--ctrlButtonSubtleForegroundColorSelected, ${toggleButtonGroupTokens.buttonSubtleForegroundColorSelected})`,

  ctrlButtonTransparentBackgroundColorSelected: `var(--ctrlButtonTransparentBackgroundColorSelected, ${toggleButtonGroupTokens.buttonTransparentBackgroundColorSelected})`,
  ctrlButtonTransparentForegroundColorSelected: `var(--ctrlButtonTransparentForegroundColorSelected, ${toggleButtonGroupTokens.buttonTransparentForegroundColorSelected})`,
};
