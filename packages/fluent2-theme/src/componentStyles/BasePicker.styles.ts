import type { IBasePickerStyleProps, IBasePickerStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { getInputFocusStyle } from '@fluentui/react';

export function getBasePickerStyles(
  props: IBasePickerStyleProps,
): IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles> {
  const { theme, isFocused, disabled } = props;

  const focusBorderColor = theme?.semanticColors.inputFocusBorderAlt
    ? theme?.semanticColors.inputFocusBorderAlt
    : '#0f6cbd';
  const focusBorderRadius = theme?.effects.roundedCorner4 ? theme?.effects.roundedCorner4 : 4;

  const styles: Partial<IBasePickerStyles> = {
    text: [
      { borderRadius: theme?.effects.roundedCorner4 },
      isFocused && !disabled && getInputFocusStyle(focusBorderColor, focusBorderRadius),
    ],
  };

  return styles;
}
