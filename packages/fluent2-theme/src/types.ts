import { IEffects, ISemanticColors } from '@fluentui/react';

export interface IExtendedEffects extends IEffects {
  roundedCorner8?: string;
  roundedCornerCircle?: string;
}

export interface IExtendedSemanticColors extends ISemanticColors {
  // no disabledBottomBorder, it should match the rest of the border.
  inputBottomBorderFocus?: string;
  inputBottomBorderRest?: string;
}
