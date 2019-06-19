import {
  ISuggestionsItemStyleProps,
  ISuggestionsItemStyles,
  ISuggestionsStyleProps,
  ISuggestionsStyles
} from 'office-ui-fabric-react/lib/Pickers';

export const SuggestionItemStyles = (props: ISuggestionsItemStyleProps): Partial<ISuggestionsItemStyles> => {
  return {
    closeButton: {
      background: 'transparent'
    }
  };
};

export const SuggestionsStyles = (props: ISuggestionsStyleProps): Partial<ISuggestionsStyles> => {
  return {
    suggestionsContainer: {
      borderBottom: 'none'
    }
  };
};
