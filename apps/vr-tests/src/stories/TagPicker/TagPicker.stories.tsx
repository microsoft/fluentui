import * as React from 'react';
import { Steps, Keys } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { TagPicker, Fabric, ITag } from '@fluentui/react';

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

const getTextFromItem = (item: ITag) => item.name;

const getList = () => testTags;

export default {
  title: 'TagPicker',
  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-BasePicker-input')
        .setValue('.ms-BasePicker-input', 'a')
        .snapshot('Open Suggestion Menu', { cropTo: '.testWrapper' })
        .hover('.ms-Suggestions-item')
        .snapshot('Suggestion Menu Item Hover', { cropTo: '.testWrapper' })
        .keys('.ms-BasePicker-input', Keys.upArrow)
        .end(),
    ),
  ],
};

export const Root = () => (
  <TagPicker
    onResolveSuggestions={getList}
    onEmptyInputFocus={getList}
    getTextFromItem={getTextFromItem}
    pickerSuggestionsProps={{
      suggestionsHeaderText: 'Suggested Tags',
      noResultsFoundText: 'No Color Tags Found',
      searchForMoreText: 'Get more Results',
    }}
    itemLimit={2}
  />
);

export const Selected = () => (
  <Fabric>
    <TagPicker
      defaultSelectedItems={[testTags[4]]}
      onResolveSuggestions={getList}
      onEmptyInputFocus={getList}
      getTextFromItem={getTextFromItem}
      pickerSuggestionsProps={{
        suggestionsHeaderText: 'Suggested Tags',
        noResultsFoundText: 'No Color Tags Found',
      }}
      itemLimit={2}
    />
  </Fabric>
);

export const SelectedRTL = getStoryVariant(Selected, RTL);
