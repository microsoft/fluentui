import { styled } from '../../../Utilities';
import { ISuggestionItemProps, ISuggestionItemStyleProps, ISuggestionItemStyles } from './SuggestionItem.types';
import { getStyles } from './SuggestionItem.styles';
import { SuggestionItemBase } from './SuggestionItem.base';

export function SuggestionItem<T>(): (props: ISuggestionItemProps<T>) => JSX.Element {
  return (
    styled<ISuggestionItemProps<T>, ISuggestionItemStyleProps, ISuggestionItemStyles>(
      SuggestionItemBase,
      getStyles,
      undefined,
      {
        scope: 'SuggestionItem'
      }
    )
  );
}
