import { ISpinnerStyleProps, ISpinnerStyles, IStyleFunctionOrObject, SpinnerSize } from '@fluentui/react';
import { FontWeights } from '@fluentui/react';

export function getSpinnerStyles(
  props: ISpinnerStyleProps,
): IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles> {
  const { theme, size } = props;

  const styles: Partial<ISpinnerStyles> = {
    label: [theme.fonts.mediumPlus, { color: theme.semanticColors.bodyText, fontWeight: FontWeights.semibold }],
    circle: [
      {
        borderWidth: 3,
      },
      size === SpinnerSize.large && {
        height: 36,
        width: 36,
      },
      size === SpinnerSize.medium && {
        // default
        height: 32,
        width: 32,
      },
    ],
  };

  return styles;
}
