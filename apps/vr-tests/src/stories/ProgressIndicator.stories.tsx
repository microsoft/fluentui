import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { ProgressIndicator } from '@fluentui/react';

storiesOf('ProgressIndicator', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('0%', () => (
    <ProgressIndicator
      label="Example title"
      description="Example description"
      percentComplete={0}
    />
  ))
  .addStory(
    '50%',
    () => (
      <ProgressIndicator
        label="Example title"
        description="Example description"
        percentComplete={0.5}
      />
    ),
    { includeRtl: true },
  )
  .addStory('100%', () => (
    <ProgressIndicator
      label="Example title"
      description="Example description"
      percentComplete={1}
    />
  ));
