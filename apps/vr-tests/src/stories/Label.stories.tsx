import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Label } from '@fluentui/react';

storiesOf('Label', module)
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
  .addStory('Root', () => <Label>I'm a label</Label>, { includeRtl: true })
  .addStory('Disabled', () => <Label disabled>I'm a disabled label</Label>)
  .addStory('Required', () => <Label required>I'm a required label</Label>);
