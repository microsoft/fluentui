import * as React from 'react';
import { BaseFloatingSuggestions } from '../FloatingSuggestions';
import { SuggestionItemNormal } from './FloatingPeopleSuggestionItems/SuggestionItemDefault';
import type { IFloatingPeopleSuggestionsProps } from './FloatingPeopleSuggestions.types';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';
import type { IFloatingSuggestionOnRenderItemProps } from '../FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import type { JSXElement } from '@fluentui/utilities';

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const FloatingPeopleSuggestions = (props: IFloatingPeopleSuggestionsProps): JSXElement => {
  const renderSuggestionItem = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
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
