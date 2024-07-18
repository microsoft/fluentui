import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { DatePicker as DatePickerBase } from '@fluentui/react-datepicker-compat';
import type { DatePickerProps } from '@fluentui/react-datepicker-compat';
import { DateRangeType } from '@fluentui/react-calendar-compat';
import { Field } from '@fluentui/react-field';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST } from '../../utilities';

const DatePicker = (props: DatePickerProps & { renderRelativeElement?: boolean }) => {
  const today = new Date('3/15/2023');
  const { renderRelativeElement, ...restProps } = props;
  return (
    <div style={{ width: '500px', height: '330px', padding: '20px' }}>
      <DatePickerBase value={today} today={today} {...restProps} />
      {renderRelativeElement && <input style={{ position: 'relative', display: 'block', width: '100%' }} />}
    </div>
  );
};

export default {
  title: 'DatePicker Compat',
  component: DatePicker,
  decorators: [
    story => (
      <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
        <div style={{ display: 'flex' }}>
          <div className="testWrapper" style={{ overflow: 'hidden' }}>
            {story()}
          </div>
        </div>
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export const DateRangeDay = () => <DatePicker calendar={{ dateRangeType: DateRangeType.Day }} defaultOpen={true} />;

DateRangeDay.storyName = 'DateRange: day';

export const DateRangeWeek = () => <DatePicker calendar={{ dateRangeType: DateRangeType.Week }} defaultOpen={true} />;

DateRangeWeek.storyName = 'DateRange: week';

export const DateRangeWorkWeek = () => (
  <DatePicker calendar={{ dateRangeType: DateRangeType.WorkWeek }} defaultOpen={true} />
);

DateRangeWorkWeek.storyName = 'DateRange: work week';

export const DateRangeMonth = () => <DatePicker calendar={{ dateRangeType: DateRangeType.Month }} defaultOpen={true} />;
DateRangeMonth.storyName = 'DateRange: month';

export const DateRangeDayDarkMode = getStoryVariant(DateRangeDay, DARK_MODE);

export const DateRangeMonthHightContrast = getStoryVariant(DateRangeMonth, HIGH_CONTRAST);

export const MarkedDates = () => (
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

export const ShowWeekNumbers = () => <DatePicker showWeekNumbers defaultOpen={true} />;
ShowWeekNumbers.storyName = 'showWeekNumbers';

export const ShowWeekNumbersDarkMode = getStoryVariant(ShowWeekNumbers, DARK_MODE);

export const ShowWeekNumbersHightContrast = getStoryVariant(ShowWeekNumbers, HIGH_CONTRAST);

export const AllowTextInput = () => <DatePicker allowTextInput />;

AllowTextInput.storyName = 'allowTextInput';

export const Underlined = () => <DatePicker underlined />;

export const UnderlinedAndRequired = () => (
  <Field required>
    <DatePicker underlined />
  </Field>
);

UnderlinedAndRequired.storyName = 'Underlined and required';
