import * as React from 'react';
import { BaseFloatingSuggestions } from '../FloatingSuggestions';
import { SuggestionItemNormal } from './FloatingPeopleSuggestionItems/SuggestionItemDefault';
import type { IFloatingPeopleSuggestionsProps } from './FloatingPeopleSuggestions.types';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';
import type { IFloatingSuggestionOnRenderItemProps } from '../FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import type { JSXElement } from '@fluentui/utilities';

export const FloatingPeopleSuggestions = (props: IFloatingPeopleSuggestionsProps): JSXElement => {
  const renderSuggestionItem = React.useCallback(
    (suggestionItemProps: IFloatingSuggestionOnRenderItemProps<IPersonaProps>): JSXElement => {
      return SuggestionItemNormal({ ...suggestionItemProps.item });
    },
    [],
  );

  return (
    <>
      <BaseFloatingSuggestions
        {...props}
        onRenderSuggestion={props.onRenderSuggestion ? props.onRenderSuggestion : renderSuggestionItem}
      />
    </>
  );
};
