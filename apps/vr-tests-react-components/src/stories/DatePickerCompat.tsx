import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { DatePicker, DateRangeType } from '@fluentui/react-datepicker-compat';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('DatePicker Compat', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('rest', { cropTo: '.testWrapper' })
        .click('.datepicker-input')
        .snapshot('opened', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('default', () => <DatePicker input={{ className: 'datepicker-input' }} />, {
    includeHighContrast: true,
    includeDarkMode: true,
    includeRtl: true,
  });

storiesOf('DatePicker Compat', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addStory('DateRange: day', () => (
    <DatePicker calendar={{ dateRangeType: DateRangeType.Day }} popover={{ open: true }} />
  ))
  .addStory('DateRange: work week', () => (
    <DatePicker calendar={{ dateRangeType: DateRangeType.Week }} popover={{ open: true }} />
  ))
  .addStory('DateRange: week', () => (
    <DatePicker calendar={{ dateRangeType: DateRangeType.WorkWeek }} popover={{ open: true }} />
  ))
  .addStory('DateRange: month', () => (
    <DatePicker calendar={{ dateRangeType: DateRangeType.Month }} popover={{ open: true }} />
  ))
  .addStory('allowTextInput', () => <DatePicker allowTextInput />)
  .addStory('Required', () => <DatePicker isRequired />)
  .addStory('Underlined', () => <DatePicker underlined />)
  .addStory('Underlined and required', () => <DatePicker underlined isRequired />)
  .addStory('With label', () => <DatePicker label="Select a date" />);
