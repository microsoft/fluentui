import * as React from 'react';

import { TagPicker, IBasePicker, ITag, IInputProps, IBasePickerSuggestionsProps } from '@fluentui/react/lib/Pickers';
import { Toggle, IToggleStyles } from '@fluentui/react/lib/Toggle';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { useBoolean } from '@fluentui/react-hooks';

const rootClass = mergeStyles({
  maxWidth: 500,
});

const toggleStyles: Partial<IToggleStyles> = { root: { margin: '10px 0' } };

const inputProps: IInputProps = {
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
  onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
};

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested tags',
  noResultsFoundText: 'No color tags found',
};

const testTags: ITag[] = [
  'black',
  'blue',
  'brown',
  'cyan',
  'green',
  'magenta',
  'mauve',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'violet',
  'white',
  'yellow',
].map(item => ({ key: item, name: item }));

const listContainsTagList = (tag: ITag, tagList?: ITag[]) => {
  if (!tagList || !tagList.length || tagList.length === 0) {
    return false;
  }
  return tagList.some(compareTag => compareTag.key === tag.key);
};

const filterSuggestedTags = (filterText: string, tagList: ITag[]): ITag[] => {
  return filterText
    ? testTags.filter(
        tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(tag, tagList),
      )
    : [];
};

const filterSelectedTags = (filterText: string, tagList: ITag[]): ITag[] => {
  return filterText ? testTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
};

const getTextFromItem = (item: ITag) => item.name;

export const TagPickerBasicExample: React.FunctionComponent = () => {
  // All pickers extend from BasePicker specifying the item type.
  const picker = React.useRef<IBasePicker<ITag>>(null);
  const [tagPicker, { toggle: toggleIsTagPickerVisible }] = useBoolean(false);

  const onItemSelected = React.useCallback((item: ITag): ITag | null => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }
    return item;
  }, []);

  return (
    <div className={rootClass}>
      <Toggle
        styles={toggleStyles}
        label="Disable tag picker"
        checked={tagPicker}
        onChange={toggleIsTagPickerVisible}
      />
      <label htmlFor="picker1">
        Filter items in suggestions: This picker will filter added items from the search suggestions.
      </label>
      <TagPicker
        removeButtonAriaLabel="Remove"
        selectionAriaLabel="Selected colors"
        onResolveSuggestions={filterSuggestedTags}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        disabled={tagPicker}
        inputProps={{
          ...inputProps,
          id: 'picker1',
        }}
      />
      <br />
      <label htmlFor="picker2">
        Filter items on selected: This picker will show already-added suggestions but will not add duplicate tags.
      </label>
      <TagPicker
        removeButtonAriaLabel="Remove"
        selectionAriaLabel="Selected colors"
        componentRef={picker}
        onResolveSuggestions={filterSelectedTags}
        onItemSelected={onItemSelected}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        disabled={tagPicker}
        inputProps={{
          ...inputProps,
          id: 'picker2',
        }}
      />
    </div>
  );
};
