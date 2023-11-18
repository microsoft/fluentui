import * as React from 'react';

import { Steps, StoryWright } from 'storywright';
import { InfoLabel } from '@fluentui/react-infolabel';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('InfoLabel', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('default', () => <InfoLabel info="Test">This is an info label</InfoLabel>, {
    includeHighContrast: true,
    includeDarkMode: true,
    includeRtl: true,
  })
  .addStory('wrap', () => (
    <InfoLabel info="Test">
      This is a very long info label that should wrap to multiple lines and put the info button on the last line
    </InfoLabel>
  ))
  .addStory('size:small', () => (
    <InfoLabel size="small" info="Test">
      This is a small info label
    </InfoLabel>
  ))
  .addStory('size:large', () => (
    <InfoLabel size="large" info="Test">
      This is a large info label
    </InfoLabel>
  ))
  .addStory(
    'required',
    () => (
      <InfoLabel required info="Test">
        This is a required info label
      </InfoLabel>
    ),
    {
      includeRtl: true,
    },
  )
  .addStory('sizes -- open', () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '60px',
        paddingLeft: '10px',
        paddingBottom: '10px',
        gap: '80px',
        alignItems: 'start',
      }}
    >
      <InfoLabel size="small" info="This is the content of an InfoButton." infoButton={{ popover: { open: true } }} />
      <InfoLabel size="medium" info="This is the content of an InfoButton." infoButton={{ popover: { open: true } }} />
      <InfoLabel size="large" info="This is the content of an InfoButton." infoButton={{ popover: { open: true } }} />
    </div>
  ));
