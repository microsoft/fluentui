import * as React from 'react';
import { TestWrapperDecorator } from '../../utilities';
import { Fabric, CompactPeoplePicker, ListPeoplePicker, NormalPeoplePicker } from '@fluentui/react';

import { getPeople, getTextFromItem, suggestionProps } from './utils';

export default {
  title: 'PeoplePicker',
  decorators: [TestWrapperDecorator],
};

export const NormalDisabled = () => (
  <Fabric>
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      disabled
    />
  </Fabric>
);

NormalDisabled.storyName = 'Normal disabled';

export const ListDisabled = () => (
  <Fabric>
    <ListPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      disabled
    />
  </Fabric>
);

ListDisabled.storyName = 'List disabled';

export const CompactDisabled = () => (
  <Fabric>
    <CompactPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      disabled
    />
  </Fabric>
);

CompactDisabled.storyName = 'Compact disabled';

export const NormalWithPlaceholder = () => (
  <Fabric>
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      inputProps={{
        placeholder: 'Add items here',
      }}
    />
  </Fabric>
);

NormalWithPlaceholder.storyName = 'Normal with placeholder';

export const NormalDisabledWithPlaceholder = () => (
  <Fabric>
    <NormalPeoplePicker
      onResolveSuggestions={getPeople}
      onEmptyInputFocus={getPeople}
      getTextFromItem={getTextFromItem}
      className={'ms-PeoplePicker'}
      pickerSuggestionsProps={suggestionProps}
      inputProps={{
        placeholder: 'Add items here',
      }}
      disabled
    />
  </Fabric>
);

NormalDisabledWithPlaceholder.storyName = 'Normal disabled with placeholder';
