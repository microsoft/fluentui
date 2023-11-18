import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Layer } from '@fluentui/react';

storiesOf('Layer', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.ms-Layer' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => <Layer>Layer content</Layer>, { includeRtl: true });
