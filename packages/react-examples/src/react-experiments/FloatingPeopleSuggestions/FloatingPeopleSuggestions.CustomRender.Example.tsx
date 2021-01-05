import * as React from 'react';
import {
  IFloatingSuggestionItemProps,
  FloatingPeopleSuggestions,
  IFloatingSuggestionItem,
  IFloatingSuggestionOnRenderItemProps,
} from '@fluentui/react-experiments/lib/FloatingPeopleSuggestionsComposite';
import { mru } from '@fluentui/example-data';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { css, classNamesFunction } from '@fluentui/react-experiments/lib/Utilities';

const _suggestions = [
  {
    key: '1',
    id: '1',
    displayText: 'Suggestion 1',
    item: mru[0],
    isSelected: true,
    showRemoveButton: true,
  },
  {
    key: '2',
    id: '2',
    displayText: 'Suggestion 2',
    item: mru[1],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '3',
    id: '3',
    displayText: 'Suggestion 3',
    item: mru[2],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '4',
    id: '4',
    displayText: 'Suggestion 4',
    item: mru[3],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '5',
    id: '5',
    displayText: 'Suggestion 5',
    item: mru[4],
    isSelected: false,
    showRemoveButton: true,
  },
] as IFloatingSuggestionItem<IPersonaProps>[];

import { getGlobalClassNames, getTheme, IStyle } from '@fluentui/style-utilities';

interface ISuggestionItemExampleStylesProps {}
interface ISuggestionItemExampleStyles {
  persona: IStyle;
  personaContent: IStyle;
}

const GlobalClassNames = {
  root: 'ms-FloatingPeopleSuggestions-SuggestionItemDefault-persona',
  callout: 'ms-FloatingPeopleSuggestions-SuggestionItemDefault-personaContent',
};

const getStyles = (props: ISuggestionItemExampleStylesProps): ISuggestionItemExampleStyles => {
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

export const FloatingPeopleSuggestionsCustomRenderExample = (): JSX.Element => {
  const [peopleSuggestions, setPeopleSuggestions] = React.useState<IFloatingSuggestionItemProps<IPersonaProps>[]>([
    ..._suggestions,
  ]);

  const _onSuggestionSelected = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    item: IFloatingSuggestionItemProps<IPersonaProps>,
  ) => {
    _markSuggestionSelected(item);
  };

  const _onSuggestionRemoved = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    suggestionToRemove: IFloatingSuggestionItemProps<IPersonaProps>,
  ) => {
    setPeopleSuggestions(suggestions => {
      const modifiedSuggestions = suggestions.filter(item => item.id !== suggestionToRemove.id);
      return modifiedSuggestions;
    });
  };

  const _markSuggestionSelected = (selectedSuggestion: IFloatingSuggestionItemProps<IPersonaProps>) => {
    setPeopleSuggestions(suggestions => {
      const modifiedSuggestions = suggestions.map(suggestion =>
        suggestion.id === selectedSuggestion.id
          ? { ...suggestion, isSelected: true }
          : { ...suggestion, isSelected: false },
      );
      return modifiedSuggestions;
    });
  };

  const renderSuggestionItem = React.useCallback(
    (suggestionItemProps: IFloatingSuggestionOnRenderItemProps<IPersonaProps>): JSX.Element => {
      const getClassNames = classNamesFunction<ISuggestionItemExampleStylesProps, ISuggestionItemExampleStyles>();
      const classNames = getClassNames(getStyles);
      return (
        <div className={css('ms-PeoplePicker-personaContent', classNames.personaContent)}>
          <div>
            {suggestionItemProps.item.text} ({suggestionItemProps.item.secondaryText})
          </div>
        </div>
      );
    },
    [],
  );

  return (
    <>
      <FloatingPeopleSuggestions
        suggestions={[...peopleSuggestions]}
        isSuggestionsVisible={true}
        targetElement={null}
        /* eslint-disable react/jsx-no-bind */
        onSuggestionSelected={_onSuggestionSelected}
        onRemoveSuggestion={_onSuggestionRemoved}
        /* eslint-enable react/jsx-no-bind */
        suggestionsHeaderText={'People suggestions'}
        noResultsFoundText={'No suggestions'}
        onFloatingSuggestionsDismiss={undefined}
        showSuggestionRemoveButton={true}
        onRenderSuggestion={renderSuggestionItem}
      />
    </>
  );
};
