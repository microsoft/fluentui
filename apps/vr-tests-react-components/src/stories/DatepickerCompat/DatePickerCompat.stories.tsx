import * as React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { DatePicker as DatePickerBase } from '@fluentui/react-datepicker-compat';
import type { DatePickerProps } from '@fluentui/react-datepicker-compat';
import { DateRangeType } from '@fluentui/react-calendar-compat';
import { Field } from '@fluentui/react-field';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, TestWrapperDecorator } from '../../utilities';

const DatePicker = (props: DatePickerProps & { renderRelativeElement?: boolean }) => {
  const today = new Date('3/15/2023');
  const { renderRelativeElement, ...restProps } = props;
  return (
    <div style={{ width: '500px', height: '330px', padding: '10px' }}>
      <DatePickerBase value={today} today={today} {...restProps} />
      {renderRelativeElement && <input style={{ position: 'relative', display: 'block', width: '100%' }} />}
    </div>
  );
};

export default {
  title: 'DatePicker Compat',
  component: DatePicker,
  decorators: [
    TestWrapperDecorator,
    story => (
      <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

type Story = StoryFn<typeof DatePicker>;

export const DateRangeDay: Story = () => (
  <DatePicker calendar={{ dateRangeType: DateRangeType.Day }} defaultOpen={true} />
);

DateRangeDay.storyName = 'DateRange: day';

export const DateRangeWeek: Story = () => (
  <DatePicker calendar={{ dateRangeType: DateRangeType.Week }} defaultOpen={true} />
);

DateRangeWeek.storyName = 'DateRange: week';

export const DateRangeWorkWeek: Story = () => (
  <DatePicker calendar={{ dateRangeType: DateRangeType.WorkWeek }} defaultOpen={true} />
);

DateRangeWorkWeek.storyName = 'DateRange: work week';

export const DateRangeMonth: Story = () => (
  <DatePicker calendar={{ dateRangeType: DateRangeType.Month }} defaultOpen={true} />
);
DateRangeMonth.storyName = 'DateRange: month';

export const DateRangeDayDarkMode = getStoryVariant(DateRangeDay, DARK_MODE);

export const DateRangeMonthHightContrast = getStoryVariant(DateRangeMonth, HIGH_CONTRAST);

export const MarkedDates: Story = () => (
  <DatePicker
    calendar={{
      calendarDayProps: { getMarkedDays: (start, end) => [new Date('3/15/2023'), new Date('3/10/2023')] },
    }}
    defaultOpen={true}
  />
);
MarkedDates.storyName = 'marked dates';

export const MarkedDatesDarkMode = getStoryVariant(MarkedDates, DARK_MODE);

export const MarkedDatesHightContrast = getStoryVariant(MarkedDates, HIGH_CONTRAST);

export const ShowWeekNumbers: Story = () => <DatePicker showWeekNumbers defaultOpen={true} />;
ShowWeekNumbers.storyName = 'showWeekNumbers';

export const ShowWeekNumbersDarkMode = getStoryVariant(ShowWeekNumbers, DARK_MODE);

export const ShowWeekNumbersHightContrast = getStoryVariant(ShowWeekNumbers, HIGH_CONTRAST);

export const AllowTextInput: Story = () => <DatePicker allowTextInput />;

AllowTextInput.storyName = 'allowTextInput';

export const Required: Story = () => (
  <Field label="Select a date" required>
    <DatePicker />
  </Field>
);

export const Underlined: Story = () => <DatePicker underlined />;

export const UnderlinedAndRequired: Story = () => (
  <Field required>
    <DatePicker underlined />
  </Field>
);

UnderlinedAndRequired.storyName = 'Underlined and required';

export const WithLabel: Story = () => (
  <Field label="Select a date">
    <DatePicker />
  </Field>
);

WithLabel.storyName = 'With label';

export const WhenRenderingInlineItShouldNotRenderBehindRelativelyPositionedElements: Story = () => (
  <Field label="Select a date">
    <DatePicker open inlinePopup renderRelativeElement />
  </Field>
);

WhenRenderingInlineItShouldNotRenderBehindRelativelyPositionedElements.storyName =
  'when rendering inline, it should not render behind relatively positioned elements';
