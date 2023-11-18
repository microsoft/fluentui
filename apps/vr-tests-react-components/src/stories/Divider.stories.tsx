import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Divider } from '@fluentui/react-divider';
import { TestWrapperDecorator, TestWrapperDecoratorFixedWidth } from '../utilities/index';

storiesOf('Divider Converged - Horizontal', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('without content', () => <Divider />, { includeRtl: true })
  .addStory('with content', () => <Divider>Today</Divider>, {
    includeRtl: true,
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Start Aligned', () => <Divider alignContent="start">Today</Divider>, {
    includeRtl: true,
  })
  .addStory('End Aligned', () => <Divider alignContent="end">Today</Divider>, { includeRtl: true })
  .addStory('Appearance subtle', () => <Divider appearance="subtle">Today</Divider>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Appearance strong', () => <Divider appearance="strong">Today</Divider>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Appearance brand', () => <Divider appearance="brand">Today</Divider>, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Inset', () => <Divider inset>Today</Divider>);

storiesOf('Divider Converged - Vertical', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <div style={{ height: '200px' }}>
      <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
    </div>
  ))
  .addStory('Center Aligned', () => <Divider vertical>Today</Divider>)
  .addStory('Start Aligned', () => (
    <Divider vertical alignContent="start">
      Today
    </Divider>
  ))
  .addStory('End Aligned', () => (
    <Divider vertical alignContent="end">
      Today
    </Divider>
  ))
  .addStory('inset', () => (
    <Divider inset vertical>
      Today
    </Divider>
  ));
