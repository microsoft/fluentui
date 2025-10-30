import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, Keys } from 'storywright';
import type { StoryParameters } from 'storywright';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
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
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-BasePicker-input')
        .setValue('.ms-BasePicker-input', 'a')
        .snapshot('Open Suggestion Menu', { cropTo: '.testWrapper' })
        .hover('.ms-Suggestions-item')
        .snapshot('Suggestion Menu Item Hover', { cropTo: '.testWrapper' })
        .keys('.ms-BasePicker-input', Keys.upArrow)
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof TagPicker>;

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
