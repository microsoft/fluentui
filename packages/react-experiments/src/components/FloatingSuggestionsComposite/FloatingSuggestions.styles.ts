import { getGlobalClassNames, getTheme } from '@fluentui/style-utilities';
import type { IBaseFloatingSuggestionsStyles, IBaseFloatingSuggestionsStylesProps } from './FloatingSuggestions.types';

const GlobalClassNames = {
  root: 'ms-FloatingSuggestions',
  callout: 'ms-FloatingSuggestions-callout',
};

export const getStyles = (props: IBaseFloatingSuggestionsStylesProps): IBaseFloatingSuggestionsStyles => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in Editing item getStyles function.');
  }

  // const { semanticColors } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, {}],
    callout: [
      classNames.callout,
      {
        selectors: {
          ['.ms-FloatingSuggestionsItem-itemButton']: {
            padding: '0px',
            border: 'none',
          },
          ['.ms-FloatingSuggestionsList']: {
            minWidth: '260px',
          },
        },
      },
    ],
  };
};
