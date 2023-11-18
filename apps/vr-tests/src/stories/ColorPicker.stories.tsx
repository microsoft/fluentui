import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { ColorPicker, Fabric } from '@fluentui/react';

storiesOf('ColorPicker', module)
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
  .addStory(
    'Root',
    () => (
      <Fabric>
        <ColorPicker
          color="#FFF"
          styles={{
            input: { fontFamily: 'Segoe UI' },
          }}
        />
      </Fabric>
    ),
    {
      includeRtl: true,
    },
  )
  .addStory('Blue', () => (
    <Fabric>
      <ColorPicker
        color="#48B"
        styles={{
          input: { fontFamily: 'Segoe UI' },
        }}
      />
    </Fabric>
  ));
