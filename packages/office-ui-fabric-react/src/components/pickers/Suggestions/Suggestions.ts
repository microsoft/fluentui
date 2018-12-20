import { styled } from '../../../Utilities';
import { ISuggestionsProps, ISuggestionsStyleProps, ISuggestionsStyles } from './Suggestions.types';
import { getStyles } from './Suggestions.styles';
import { SuggestionsBase } from './Suggestions.base';

export function Suggestions<T>(): (props: ISuggestionsProps<T>) => JSX.Element {
  return styled<ISuggestionsProps<T>, ISuggestionsStyleProps, ISuggestionsStyles>(SuggestionsBase, getStyles, undefined, {
    scope: 'Suggestions'
  });
}
