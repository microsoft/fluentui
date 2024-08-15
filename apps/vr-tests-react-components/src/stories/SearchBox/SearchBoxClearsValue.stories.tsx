import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { SearchBox } from '@fluentui/react-search';

import { withStoryWrightSteps, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'SearchBox Converged',
  decorators: [
    TestWrapperDecorator,
    story =>
      withStoryWrightSteps({
        story,
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
      }),
  ],
} satisfies Meta<typeof SearchBox>;

export const ClearsValue = () => <SearchBox defaultValue="Value!" />;
ClearsValue.storyName = 'Clears value';
