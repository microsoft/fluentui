import type { IStyleFunctionOrObject, ITextFieldStyleProps, ITextFieldStyles } from '@fluentui/react';
import { FontWeights } from '@fluentui/react';

export function getTextFieldStyles(
  props: ITextFieldStyleProps,
): IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles> {
  const { theme } = props;
  const { effects } = theme;

  const styles: Partial<ITextFieldStyles> = {
    root: {
      '.ms-Fabric--isFocusVisible &:focus::after': {
        borderRadius: effects.roundedCorner4,
      },
    },
    subComponentStyles: {
      label: {
        root: {
          fontWeight: FontWeights.regular,
        },
      },
    },
    fieldGroup: {
      borderRadius: effects.roundedCorner4,
      ':after': {
        borderRadius: effects.roundedCorner4,
      },
    },
  };

  return styles;
}
