import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { Fabric, CompactPeoplePicker, ListPeoplePicker, NormalPeoplePicker } from '@fluentui/react';
import { getPeople, getTextFromItem, suggestionProps, people, overflowPersona } from './utils';

export default {
  title: 'PeoplePicker',
  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('.ms-BasePicker-input')
        .hover('.ms-Suggestions-item')
        .snapshot('suggestions')
        .end(),
    ),
  ],
};

export const Normal = () => (
  <Fabric>
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  </Fabric>
);

export const NormalSelected = () => (
  <Fabric>
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      defaultSelectedItems={[people[2]]}
    />
  </Fabric>
);

NormalSelected.storyName = 'Normal selected';

export const NormalSelectedRTL = getStoryVariant(NormalSelected, RTL);

export const NormalOverflowSelected = () => (
  <Fabric>
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      styles={{ root: { maxWidth: 200 } }}
      defaultSelectedItems={[people[1], overflowPersona]}
    />
  </Fabric>
);

NormalOverflowSelected.storyName = 'Normal Overflow selected';

export const NormalOverflowSelectedRTL = getStoryVariant(NormalOverflowSelected, RTL);

export const List = () => (
  <Fabric>
    <ListPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  </Fabric>
);

export const ListSelected = () => (
  <Fabric>
    <ListPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      defaultSelectedItems={[people[2]]}
    />
  </Fabric>
);

ListSelected.storyName = 'List selected';

export const ListSelectedRTL = getStoryVariant(ListSelected, RTL);

export const Compact = () => (
  <Fabric>
    <CompactPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
    />
  </Fabric>
);

export const CompactSelected = () => (
  <Fabric>
    <CompactPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      defaultSelectedItems={[people[2]]}
    />
  </Fabric>
);

CompactSelected.storyName = 'Compact selected';

export const CompactSelectedRTL = getStoryVariant(CompactSelected, RTL);
