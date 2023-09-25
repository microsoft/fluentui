import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Overlay } from '@fluentui/react';

storiesOf('Overlay', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.ms-Overlay' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory(
    'Root',
    // prettier-ignore
    () => <Overlay>Overlay content</Overlay>,
    { includeRtl: true },
  )
  .addStory(
    'Dark',
    // prettier-ignore
    () => <Overlay isDarkThemed>Overlay content</Overlay>,
  );
