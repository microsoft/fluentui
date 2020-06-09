import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { TagPicker, ITag } from 'office-ui-fabric-react/lib/Pickers';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { useBoolean } from '@uifabric/react-hooks';

const inputProps = {
  'aria-label': 'Tag Picker',
};
const pickerSuggestionsProps = {
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

export const AnnouncedSearchResultsExample: React.FunctionComponent = () => {
  const [emptyInput, { toggle: toggleEmptyInput }] = useBoolean(false);
  const [numberOfSuggestions, setNumberOfSuggestions] = React.useState(0);

  const renderAnnounced = (): JSX.Element | undefined => {
    if (!emptyInput) {
      return (
        <Announced
          message={
            numberOfSuggestions === 1
              ? `${numberOfSuggestions} Color Tag Found`
              : `${numberOfSuggestions} Color Tags Found`
          }
        />
      );
    }
  };

  const listContainsDocument = (tag: ITag, tagList: ITag[]) => {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  };
  const onFilterChanged = (filterText: string, tagList: ITag[]): ITag[] => {
    toggleEmptyInput;
    const filteredTags = filterText
      ? _testTags
          .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
          .filter(tag => !listContainsDocument(tag, tagList))
      : [];
    if (filteredTags.length !== numberOfSuggestions) {
      setNumberOfSuggestions(filteredTags.length);
    }
    return filteredTags;
  };

  return (
    <Stack tokens={stackTokens}>
      <Text>
        Turn on Narrator and type a letter or two into the TagPicker. This picker will filter added items from the
        search suggestions.
      </Text>
      {renderAnnounced()}
      <TagPicker
        onResolveSuggestions={onFilterChanged}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={pickerSuggestionsProps}
        inputProps={inputProps}
      />
    </Stack>
  );
};
