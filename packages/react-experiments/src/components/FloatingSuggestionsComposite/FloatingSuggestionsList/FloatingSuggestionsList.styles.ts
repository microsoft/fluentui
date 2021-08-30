import { getGlobalClassNames, getTheme } from '@fluentui/style-utilities';
import type {
  IFloatingSuggestionsListStyleProps,
  IFloatingSuggestionsListStyle,
} from './FloatingSuggestionsList.types';

const GlobalClassNames = {
  root: 'ms-FloatingSuggestionsList',
  suggestionsContainer: 'ms-FloatingSuggestionsList-container',
  title: 'ms-FloatingSuggestionsList-title',
  noSuggestions: 'ms-FloatingSuggestionsList-noSuggestions',
};

export const getStyles = (props: IFloatingSuggestionsListStyleProps): IFloatingSuggestionsListStyle => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in Editing item getStyles function.');
  }

  const { palette, fonts } = theme;
  const { themePrimary, neutralLight, neutralPrimaryAlt } = palette;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        minWidth: '260px',
      },
    ],
    suggestionsContainer: [
      classNames.suggestionsContainer,
      {
        overflowX: 'auto',
        overflowY: 'auto',
        maxHeight: '300px',
        borderBottom: `1px solid ${neutralLight}`,
      },
    ],
    title: [
      classNames.title,
      {
        padding: '0 12px',
        color: themePrimary,
        fontSize: fonts.small.fontSize,
        lineHeight: '40px',
        borderBottom: `1px solid ${neutralLight}`,
      },
    ],
    noSuggestions: [
      classNames.noSuggestions,
      {
        textAlign: 'center',
        color: neutralPrimaryAlt,
        fontSize: fonts.small.fontSize,
        lineHeight: '30px',
      },
    ],
  };
};
