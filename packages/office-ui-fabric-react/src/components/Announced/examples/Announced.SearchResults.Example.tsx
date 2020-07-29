import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { TagPicker, ITag, IInputProps, IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { useConstCallback } from '@uifabric/react-hooks';

const inputProps: IInputProps = {
  'aria-label': 'Tag Picker',
};
const pickerSuggestionsProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested tags',
  noResultsFoundText: 'No color tags found',
};
const _testTags: ITag[] = [
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

const stackTokens: IStackTokens = { childrenGap: 10 };

const getTextFromItem = (item: ITag): string => {
  return item.name;
};

const listContainsDocument = (tag: ITag, tagList: ITag[]) => {
  if (!tagList || !tagList.length || tagList.length === 0) {
    return false;
  }
  return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
};

export const AnnouncedSearchResultsExample: React.FunctionComponent = () => {
  const [hasFilterText, setHasFilterText] = React.useState(false);
  const [suggestionCount, setSuggestionCount] = React.useState(0);

  const onFilterChanged = useConstCallback((filterText: string, tagList: ITag[]): ITag[] => {
    setHasFilterText(!!filterText);
    const filteredTags = filterText
      ? _testTags
          .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
          .filter(tag => !listContainsDocument(tag, tagList))
      : [];
    setSuggestionCount(filteredTags.length);
    return filteredTags;
  });

  return (
    <Stack tokens={stackTokens}>
      <Text>
        Turn on Narrator and type a letter or two into the TagPicker. This picker will filter added items from the
        search suggestions.
      </Text>
      {hasFilterText && <Announced message={`${suggestionCount} color tag${suggestionCount === 1 ? '' : 's'} found`} />}
      <TagPicker
        onResolveSuggestions={onFilterChanged}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        inputProps={inputProps}
      />
    </Stack>
  );
};
