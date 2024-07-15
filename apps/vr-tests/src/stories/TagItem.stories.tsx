import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
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
  title: 'TagItem',
  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
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
    ),
  ],
};

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
