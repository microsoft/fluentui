import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { TestWrapperDecorator } from '../../utilities';
import { Fabric, NormalPeoplePicker } from '@fluentui/react';

import { getPeople, getTextFromItem, suggestionProps } from './utils';

export default {
  title: 'PeoplePicker',
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .setValue('.ms-BasePicker-input', 'a')
        .snapshot('suggestion: a')
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof NormalPeoplePicker>;

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
