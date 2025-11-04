import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { SearchBox } from '@fluentui/react-search';

import { TestWrapperDecorator } from '../../utilities';

export default {
  title: 'SearchBox Converged',
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .keys('input', 'Tab')
        .wait(250) // let focus border animation finish
        .snapshot('input focused', { cropTo: '.testWrapper' })
        .focus('[role=button]')
        .snapshot('dismiss focused', { cropTo: '.testWrapper' })
        .click('[role=button]')
        .snapshot('dismiss clicked', { cropTo: '.testWrapper' })
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof SearchBox>;

export const ClearsValue = () => <SearchBox defaultValue="Value!" />;
ClearsValue.storyName = 'Clears value';
