import { ISuggestionsStyleProps, ISuggestionsStyles } from '@fluentui/react/lib/Pickers';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const SuggestionsStyles = (props: ISuggestionsStyleProps): Partial<ISuggestionsStyles> => {
  const { theme } = props;
  if (!theme) {
    return {};
  }
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  return {
    root: {
      border: 'none',
    },
    suggestionsContainer: {
      color: semanticColors.bodyText,
    },
    title: {
      color: extendedSemanticColors.labelText,
    },
  };
};
