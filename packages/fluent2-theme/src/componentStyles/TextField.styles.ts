import type { IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from '@fluentui/react';
import { FontWeights } from '@fluentui/react';
import { IExtendedSemanticColors } from '../types';

export function getTextFieldStyles(
  props: ITextFieldStyleProps,
): IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles> {
  const { theme, focused, borderless, underlined, hasErrorMessage, disabled } = props;
  const { effects, semanticColors, palette } = theme;

  const unsetBackgroundColor = { backgroundColor: 'unset' };

  const bottomBorderFocusColor =
    (semanticColors as IExtendedSemanticColors)?.inputBottomBorderFocus ?? theme.palette.themePrimary;
  const focusBottomBorder = `2px solid ${hasErrorMessage ? semanticColors.errorText : bottomBorderFocusColor}`;

  let borderBottomColor = palette.neutralPrimary;

  if (hasErrorMessage) {
    borderBottomColor = semanticColors.errorText;
  }
  if (disabled) {
    // There is no 'inputBorderDisabled' in the v8 semantic colors.
    // Disabled border color is assigned to 'disabledBackground' in the base style file :-(
    // Which gets mapped to 'neutralLighter'
    // And I'd prefer to assign a palette color than add 2 new semantic colors or assign an incorrect semantic.
    // Bottom border color should match the rest of the border color.
    borderBottomColor = palette.neutralLighter;
  }

  const restBottomBorder = borderless || underlined ? 'unset' : `1px solid ${borderBottomColor}`;

  const styles: Partial<ITextFieldStyles> = {
    root: {
      '.ms-Fabric--isFocusVisible &:focus::after': {
        borderRadius: effects.roundedCorner4,
        borderBottom: focusBottomBorder,
      },
    },
    subComponentStyles: {
      label: {
        root: {
          fontWeight: FontWeights.regular,
        },
      },
    },
    prefix: unsetBackgroundColor,
    suffix: unsetBackgroundColor,
    field: [
      focused && {
        border: 'unset',
        ':after': {
          border: 'unset',
        },
      },
      disabled && {
        backgroundColor: 'unset',
      },
      {
        borderRadius: effects.roundedCorner4,
        ':after': {
          borderRadius: effects.roundedCorner4,
        },
      },
    ],
    fieldGroup: [
      {
        borderBottom: restBottomBorder,
        borderRadius: effects.roundedCorner4,
        ':after': {
          borderRadius: effects.roundedCorner4,
        },
      },
      focused && {
        borderColor: semanticColors.focusBorder,
        ':after': {
          borderBottom: underlined ? 'unset' : focusBottomBorder,
          clipPath: 'inset(calc(100% - 2px) 0 0 0)',
        },
      },
      disabled && {
        borderBottom: `1px solid ${borderBottomColor}`,
        backgroundColor: 'unset',
      },
    ],
  };

  return styles;
}
