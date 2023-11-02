import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TimePicker } from '@fluentui/react-timepicker-compat-preview';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('TimePicker compat', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => <StoryWright steps={new Steps().snapshot('default').end()}>{story()}</StoryWright>)
  .addStory('Default', () => <TimePicker open startHour={11} endHour={13} />)
  .addStory('With 12-hour format', () => <TimePicker open startHour={11} endHour={13} hourCycle="h11" />)
  .addStory('Show seconds', () => <TimePicker open startHour={11} endHour={13} showSeconds />);
