import { getGlobalClassNames, getTheme } from '@fluentui/style-utilities';
import type { IStyle } from '@fluentui/style-utilities';

export interface ISuggestionItemDefaultStylesProps {}

export interface ISuggestionItemDefaultStyles {
  persona: IStyle;
  personaContent: IStyle;
}

const GlobalClassNames = {
  root: 'ms-FloatingPeopleSuggestions-SuggestionItemDefault-persona',
  callout: 'ms-FloatingPeopleSuggestions-SuggestionItemDefault-personaContent',
};

export const getStyles = (props: ISuggestionItemDefaultStylesProps): ISuggestionItemDefaultStyles => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in Editing item getStyles function.');
  }

  // const { semanticColors } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    persona: [
      classNames.root,
      {
        width: '100%',
        selectors: {
          ['.ms-Persona-detail']: {
            minHeight: '40px',
          },
        },
      },
    ],
    personaContent: [
      classNames.callout,
      {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '7px 12px',
      },
    ],
  };
};
