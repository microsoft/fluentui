import type { IDropdownStyleProps, IDropdownStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { FontWeights } from '@fluentui/react';

export function getDropdownStyles(
  props: IDropdownStyleProps,
): IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles> {
  const { theme } = props;

  return {
    dropdown: {
      selectors: {
        '&:focus:after': {
          borderRadius: theme?.effects.roundedCorner4,
        },
      },
    },
    title: { borderRadius: theme?.effects.roundedCorner4 },
    caretDown: { color: theme?.palette.neutralQuaternary },
    label: { fontWeight: FontWeights.regular },
  };
}
