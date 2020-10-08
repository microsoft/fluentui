import { ISpinButtonStyleProps, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { IStyleFunction } from '@fluentui/react/lib/Utilities';

export const SpinButtonStyles: IStyleFunction<ISpinButtonStyleProps, ISpinButtonStyles> = (
  props: ISpinButtonStyleProps,
) => {
  const { theme } = props;

  return {
    input: {
      backgroundColor: theme.semanticColors.inputBackground,
      color: theme.semanticColors.inputText,
      fontSize: theme.fonts.medium.fontSize,
    },
    inputTextSelected: {
      color: theme.semanticColors.inputText,
      fontSize: theme.fonts.medium.fontSize,
    },
  };
};
