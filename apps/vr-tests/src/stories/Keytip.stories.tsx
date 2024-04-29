import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { DelayedRender, Keytip } from '@fluentui/react';

storiesOf('Keytip', module)
  .addDecorator(story => (
    <div style={{ width: '50px', height: '50px' }}>
      <span data-ktp-target={'ktp-a'}>text</span>
      {story()}
    </div>
  ))
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
  .addStory('Root', () => (
    <DelayedRender>
      <Keytip content={'A'} keySequences={['a']} visible={true} />
    </DelayedRender>
  ))
  .addStory('Disabled', () => (
    <DelayedRender>
      <Keytip content={'A'} keySequences={['a']} visible={true} disabled={true} />
    </DelayedRender>
  ))
  .addStory('Offset', () => (
    <DelayedRender>
      <Keytip content={'A'} keySequences={['a']} visible={true} offset={{ x: 15, y: 15 }} />
    </DelayedRender>
  ));
