import { ISuggestionItemProps, ISuggestionsItemStyles, ITagPickerProps } from '@fluentui/react/lib/Pickers';

export const SuggestionItemStyles = (props: ISuggestionItemProps<ITagPickerProps>): Partial<ISuggestionsItemStyles> => {
  const { theme } = props;
  if (!theme) {
    return {};
  }
  const { semanticColors } = theme;
  return {
    root: {
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: semanticColors.bodyBackground,
      color: semanticColors.bodyText,
      selectors: {
        ':hover': {
          backgroundColor: semanticColors.listItemBackgroundHovered,
        },
      },
    },
    itemButton: {
      border: 'none',
      paddingRight: '2px',
      color: semanticColors.bodyText,
      backgroundColor: semanticColors.bodyBackground,
      selectors: {
        ':hover': {
          backgroundColor: semanticColors.listItemBackgroundHovered,
          border: 'none',
        },
        ':active': {
          border: 'none',
          color: semanticColors.bodyText,
          background: semanticColors.listItemBackgroundChecked,
        },
      },
    },
  };
};
