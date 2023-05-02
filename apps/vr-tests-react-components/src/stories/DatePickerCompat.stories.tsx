import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { DatePicker as DatePickerBase, DateRangeType } from '@fluentui/react-datepicker-compat';
import { Field } from '@fluentui/react-field';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';
import type { DatePickerProps } from '@fluentui/react-datepicker-compat';

const DatePicker = (props: DatePickerProps) => {
  const today = new Date('3/15/2023');
  return (
    <div style={{ width: '500px', height: '330px', padding: '10px' }}>
      <DatePickerBase value={today} today={today} {...props} />
    </div>
  );
};

storiesOf('DatePicker Compat', module)
  .addDecorator(TestWrapperDecorator)
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
  });

storiesOf('DatePicker Compat', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('DateRange: day', () => <DatePicker calendar={{ dateRangeType: DateRangeType.Day }} defaultOpen={true} />)
  .addStory('DateRange: week', () => <DatePicker calendar={{ dateRangeType: DateRangeType.Week }} defaultOpen={true} />)
  .addStory('DateRange: work week', () => (
    <DatePicker calendar={{ dateRangeType: DateRangeType.WorkWeek }} defaultOpen={true} />
  ))
  .addStory(
    'DateRange: month',
    () => <DatePicker calendar={{ dateRangeType: DateRangeType.Month }} defaultOpen={true} />,
    {
      includeDarkMode: true,
      includeHighContrast: true,
    },
  )
  .addStory(
    'marked dates',
    () => (
      <DatePicker
        calendar={{
          calendarDayProps: { getMarkedDays: (start, end) => [new Date('3/15/2023'), new Date('3/10/2023')] },
        }}
        defaultOpen={true}
      />
    ),
    {
      includeDarkMode: true,
      includeHighContrast: true,
    },
  )
  .addStory('showWeekNumbers', () => <DatePicker showWeekNumbers defaultOpen={true} />, {
    includeDarkMode: true,
    includeHighContrast: true,
  })
  .addStory('allowTextInput', () => <DatePicker allowTextInput />)
  .addStory('Required', () => (
    <Field label="Select a date" required>
      <DatePicker />
    </Field>
  ))
  .addStory('Underlined', () => <DatePicker underlined />)
  .addStory('Underlined and required', () => (
    <Field required>
      <DatePicker underlined />
    </Field>
  ))
  .addStory('With label', () => (
    <Field label="Select a date">
      <DatePicker />
    </Field>
  ));
