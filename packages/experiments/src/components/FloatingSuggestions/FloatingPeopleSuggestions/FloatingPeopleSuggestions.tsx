import * as React from 'react';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { IFloatingSuggestionsProps } from '../FloatingSuggestions.types';
import { DefaultPeopleSuggestionsItem } from './defaults/DefaultPeopleSuggestionsItem';
import { FloatingSuggestions } from '../FloatingSuggestions';

type PartiallyOptional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Pick<Partial<T>, keyof T>;
export type IFloatingPeopleSuggestionsProps<TPersona> = PartiallyOptional<IFloatingSuggestionsProps<TPersona>, 'onRenderSuggestionsItem'>;

export const FloatingPeopleSuggestions = <TPersona extends IPersonaProps = IPersonaProps>(
  props: IFloatingPeopleSuggestionsProps<TPersona>
) => {
  return <FloatingSuggestions<TPersona> onRenderSuggestionsItem={DefaultPeopleSuggestionsItem} {...props} />;
};
export type SelectedPeopleList<TPersona extends IPersonaProps = IPersonaProps> = FloatingSuggestions<TPersona>;
