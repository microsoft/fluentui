import { getGlobalClassNames, HighContrastSelector, IStyle } from '../../../../Styling';
import { IPeoplePickerItemSuggestionStyles, IPeoplePickerItemSuggestionStyleProps } from './PeoplePickerItem.types';
import { SuggestionsItemGlobalClassNames as suggested } from '../../Suggestions/SuggestionsItem.styles';
const GlobalClassNames = {
  root: 'ms-PeoplePicker-personaContent',
  personaWrapper: 'ms-PeoplePicker-Persona',
};

export function getStyles(props: IPeoplePickerItemSuggestionStyleProps): IPeoplePickerItemSuggestionStyles {
  const { className, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const textSelectorsStyles: IStyle = {
    selectors: {
      [`.${suggested.isSuggested} &`]: {
        selectors: {
          [HighContrastSelector]: {
            color: 'HighlightText',
          },
        },
      },
      [`.${classNames.root}:hover &`]: {
        selectors: {
          [HighContrastSelector]: {
            color: 'HighlightText',
          },
        },
      },
    },
  };

  return {
    root: [
      classNames.root,
      {
        width: '100%',
        padding: '4px 12px',
      },
      className,
    ],
    personaWrapper: [
      classNames.personaWrapper,
      {
        width: 180,
      },
    ],
    subComponentStyles: {
      persona: {
        primaryText: textSelectorsStyles,
        secondaryText: textSelectorsStyles,
      },
    },
  };
}
