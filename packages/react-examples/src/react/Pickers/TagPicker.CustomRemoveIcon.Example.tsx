import * as React from 'react';

import { TagPicker, ITag, IBasePickerSuggestionsProps } from '@fluentui/react/lib/Pickers';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { useId } from '@fluentui/react-hooks';

const rootClass = mergeStyles({
  maxWidth: 500,
});

const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested colors',
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
].map(item => ({ key: item, name: item[0].toUpperCase() + item.slice(1) }));

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

const getTextFromItem = (item: ITag) => item.name;

export const TagPickerCustomRemoveIconExample: React.FunctionComponent = () => {
  const pickerId = useId('custom-icon-picker');

  return (
    <div className={rootClass}>
      <label htmlFor={pickerId}>Choose a color</label>
      <TagPicker
        removeButtonAriaLabel="Remove"
        selectionAriaLabel="Selected colors"
        onResolveSuggestions={filterSuggestedTags}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        removeButtonIconProps={{ iconName: 'Delete' }}
        itemLimit={4}
        pickerCalloutProps={{ doNotLayer: true }}
        inputProps={{
          id: pickerId,
        }}
      />
    </div>
  );
};
