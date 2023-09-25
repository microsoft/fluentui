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
        // keys 'tab' is used instead of .focus, since .focus won't show the focus indicator.
        .keys('.info-button', 'Tab')
        .snapshot('focus', { cropTo: '.testWrapper' })
        .hover('.info-button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.info-button')
        .snapshot('active', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory(
    'default',
    () => (
      <div style={{ display: 'flex', alignItems: 'flex-end', padding: '10px', minHeight: '80px' }}>
        <InfoButton className="info-button" info="This is the content of an InfoButton." />
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
  .addStory('size', () => (
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
      <InfoButton size="small" info="This is the content of an InfoButton." popover={{ open: true }} />
      <InfoButton size="medium" info="This is the content of an InfoButton." popover={{ open: true }} />
      <InfoButton size="large" info="This is the content of an InfoButton." popover={{ open: true }} />
    </div>
  ));
