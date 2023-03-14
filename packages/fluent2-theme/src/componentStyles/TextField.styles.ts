import type { IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from '@fluentui/react';
import { FontWeights } from '@fluentui/react';
import { getFluent2InputDisabledStyles, getFluent2InputFocusStyles } from './inputStyleHelpers.utils';

export function getTextFieldStyles(
  props: ITextFieldStyleProps,
): IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles> {
  const { theme, focused, borderless, underlined, hasErrorMessage, disabled } = props;
  const { effects, semanticColors, palette } = theme;

  const unsetBackgroundColor = { backgroundColor: 'unset' };

  const borderBottomColor = hasErrorMessage ? semanticColors.errorText : palette.neutralPrimary;

  const restBottomBorder = borderless || underlined ? 'unset' : `1px solid ${borderBottomColor}`;

  const styles: Partial<ITextFieldStyles> = {
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
      focused && getFluent2InputFocusStyles(theme, underlined, hasErrorMessage),
      disabled && getFluent2InputDisabledStyles(theme),
      disabled && { borderBottom: `1px solid ${semanticColors.disabledText}` },
    ],
  };

  return styles;
}
