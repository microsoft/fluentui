import * as React from 'react';

import { TagPicker, IBasePicker, ITag } from 'office-ui-fabric-react/lib/Pickers';
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean, useConstCallback } from '@uifabric/react-hooks';

const rootClass = mergeStyles({
  maxWidth: 500,
});

const checkboxStyles: Partial<ICheckboxStyles> = { root: { margin: '10px 0' } };

const inputProps = {
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
  onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
  'aria-label': 'Tag picker',
};

const pickerSuggestionsProps = {
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

export const TagPickerBasicExample: React.FunctionComponent = () => {
  // All pickers extend from BasePicker specifying the item type.
  const picker = React.useRef<IBasePicker<ITag>>(null);
  const [tagPicker, { toggle: toggleIsTagPickerVisible }] = useBoolean(false);

  const filterSuggestedTags = useConstCallback((filterText: string, tagList: ITag[]): ITag[] => {
    return filterText
      ? testTags.filter(
          tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0 && !listContainsTagList(tag, tagList),
        )
      : [];
  });

  const filterSelectedTags = useConstCallback((filterText: string, tagList: ITag[]): ITag[] => {
    return filterText ? testTags.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
  });

  const onItemSelected = useConstCallback((item: ITag): ITag | null => {
    if (picker.current && listContainsTagList(item, picker.current.items)) {
      return null;
    }
    return item;
  });

  return (
    <div className={rootClass}>
      <Checkbox
        styles={checkboxStyles}
        label="Disable tag picker"
        checked={tagPicker}
        onChange={toggleIsTagPickerVisible}
      />
      Filter items in suggestions: This picker will filter added items from the search suggestions.
      <TagPicker
        removeButtonAriaLabel="Remove"
        onResolveSuggestions={filterSuggestedTags}
        getTextFromItem={name}
        pickerSuggestionsProps={pickerSuggestionsProps}
        itemLimit={2}
        disabled={tagPicker}
        inputProps={inputProps}
      />
      <br />
      Filter items on selected: This picker will show already-added suggestions but will not add duplicate tags.
      <TagPicker
        removeButtonAriaLabel="Remove"
        componentRef={picker}
        onResolveSuggestions={filterSelectedTags}
        onItemSelected={onItemSelected}
        getTextFromItem={name}
        pickerSuggestionsProps={pickerSuggestionsProps}
        itemLimit={2}
        disabled={tagPicker}
        inputProps={inputProps}
      />
    </div>
  );
};
