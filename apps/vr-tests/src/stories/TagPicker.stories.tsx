import * as React from 'react';
import { Steps, Keys } from 'storywright';
import {
  getStoryVariant,
  STORY_VARIANT,
  StoryWrightDecorator,
  TestWrapperDecorator,
} from '../utilities';
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

export const Disabled = () => <TagPicker onResolveSuggestions={getList} disabled />;

Disabled.storyName = 'TagPicker disabled';
Disabled.parameters = { steps: [] };

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

export const SelectedRTL = getStoryVariant(Selected, STORY_VARIANT.RTL);

export const WithLongTag = () => (
  // This example MUST be inside a narrow container which forces the tag to overflow
  <Fabric style={{ width: 180 }}>
    <TagPicker
      onResolveSuggestions={getList}
      defaultSelectedItems={[
        {
          key: 'test',
          name: 'Very very long tag (this part should be truncated)',
        },
      ]}
    />
  </Fabric>
);

WithLongTag.storyName = 'With long tag';
WithLongTag.parameters = {
  steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
};

export const TagItemSelected = () => (
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
TagItemSelected.parameters = {
  steps: new Steps()
    .snapshot('default', { cropTo: '.testWrapper' })
    .hover('.ms-TagItem')
    .snapshot('Tag Item Hover', { cropTo: '.testWrapper' })
    .hover('.ms-TagItem-close')
    .snapshot('Tag Item Clear Button Hover', { cropTo: '.testWrapper' })
    .click('.ms-TagItem')
    .snapshot('Tag Item Select', { cropTo: '.testWrapper' })
    .hover('.ms-TagItem-close')
    .snapshot('Tag Item Clear Button Selected Hover', { cropTo: '.testWrapper' })
    .end(),
};

export const TagItemSelectedRTL = getStoryVariant(TagItemSelected, STORY_VARIANT.RTL);
