import type { ISpinnerStyleProps, ISpinnerStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { FontWeights } from '@fluentui/react';

export function getSpinnerStyles(
  props: ISpinnerStyleProps,
): IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles> {
  const { theme } = props;

  const styles: Partial<ISpinnerStyles> = {
    label: [theme.fonts.mediumPlus, { color: theme.semanticColors.bodyText, fontWeight: FontWeights.semibold }],
    circle: {
      borderWidth: 3,
      height: 32,
      width: 32,
    },
  };

  return styles;
}
