import * as React from 'react';
import { DefaultPeopleSuggestionsItem } from './defaults/DefaultPeopleSuggestionsItem';
import { FloatingSuggestions } from '../FloatingSuggestions';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';
import type { IFloatingSuggestionsProps } from '../FloatingSuggestions.types';

type PartiallyOptional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Pick<Partial<T>, keyof T>;
export type IFloatingPeopleSuggestionsProps<TPersona> = PartiallyOptional<
  IFloatingSuggestionsProps<TPersona>,
  'onRenderSuggestionsItem'
>;

export const FloatingPeopleSuggestions = <TPersona extends IPersonaProps = IPersonaProps>(
  props: IFloatingPeopleSuggestionsProps<TPersona>,
) => {
  return <FloatingSuggestions<TPersona> onRenderSuggestionsItem={DefaultPeopleSuggestionsItem} {...props} />;
};
export type SelectedPeopleList<TPersona extends IPersonaProps = IPersonaProps> = FloatingSuggestions<TPersona>;
