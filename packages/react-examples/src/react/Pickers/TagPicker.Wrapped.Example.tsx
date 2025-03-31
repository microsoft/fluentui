import * as React from 'react';

import {
  TagPicker,
  IBasePicker,
  ITag,
  IInputProps,
  IBasePickerSuggestionsProps,
  TagItemSuggestion,
  ITagItemSuggestionStyles,
} from '@fluentui/react/lib/Pickers';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { useId } from '@fluentui/react-hooks';

const rootClass = mergeStyles({
  maxWidth: 500,
});

const inputProps: IInputProps = {
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
  onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
};

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested tags',
  noResultsFoundText: 'No tags found',
};

const testTags: ITag[] = [
  'A short tag',
  'A very long tag that spans more than the entire width of the picker and forces the text to wrap',
  'A second very long tag that spans more than the entire width of the picker and forces the text to wrap',
  'A third very long tag that spans more than the entire width of the picker and forces the text to wrap',
].map(item => ({ key: item, name: item }));

const filterSelectedTags = (filterText: string, tagList: ITag[]): ITag[] => {
  return filterText ? testTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
};

const getTextFromItem = (item: ITag) => item.name;

const tagStyles: Partial<ITagItemSuggestionStyles> = {
  suggestionTextOverflow: {
    height: 'auto',
    whiteSpace: 'normal',
    maxWidth: 500,
  },
};

const onRenderSuggestionItem = (props: ITag) => {
  return <TagItemSuggestion styles={tagStyles}>{props.name}</TagItemSuggestion>;
};

export const TagPickerWrappedExample: React.FunctionComponent = () => {
  const pickerId = useId('wrapped-picker');
  const picker = React.useRef<IBasePicker<ITag>>(null);

  return (
    <div className={rootClass}>
      <label htmlFor={pickerId}>Choose a tag</label>
      <TagPicker
        onRenderSuggestionsItem={onRenderSuggestionItem}
        removeButtonAriaLabel="Remove"
        selectionAriaLabel="Selected tags"
        componentRef={picker}
        onResolveSuggestions={filterSelectedTags}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        inputProps={{
          ...inputProps,
          id: pickerId,
        }}
      />
    </div>
  );
};
