import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { InfoButton } from '@fluentui/react-infobutton';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('InfoButton', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('rest', { cropTo: '.testWrapper' })
        .hover('#info-button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .focus('#info-button')
        .snapshot('focus', { cropTo: '.testWrapper' })
        .mouseDown('#info-button')
        .snapshot('active', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <div style={{ paddingTop: '60px' }}>
        <InfoButton id="info-button" content="This is the content of an InfoButton." />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );

storiesOf('InfoButton', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('rest', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory(
    'size',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '60px', gap: '80px', alignItems: 'start' }}>
        <InfoButton size="small" content="This is the content of an InfoButton." popover={{ open: true }} />
        <InfoButton size="medium" content="This is the content of an InfoButton." popover={{ open: true }} />
        <InfoButton size="large" content="This is the content of an InfoButton." popover={{ open: true }} />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
