import * as React from 'react';
import { Steps } from 'storywright';
import { StoryWrightDecorator, TestWrapperDecorator } from '../../utilities';
import { Fabric, NormalPeoplePicker } from '@fluentui/react';

import { getPeople, getTextFromItem, suggestionProps } from './utils';

export default {
  title: 'PeoplePicker',
  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .setValue('.ms-BasePicker-input', 'a')
        .snapshot('suggestion: a')
        .end(),
    ),
  ],
};

export const NormalWithText = () => (
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

NormalWithText.storyName = 'Normal with text';
