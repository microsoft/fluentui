import * as React from 'react';

import { WeeklyDayPickerInlineExample } from './WeeklyDayPicker.Inline.Example';
import { WeeklyDayPickerInlineExpandableExample } from './WeeklyDayPicker.Inline.Expandable.Example';
import { WeeklyDayPickerInlineMarkedDaysExample } from './WeeklyDayPicker.Inline.MarkedDays.Example';

export const Inline = () => <WeeklyDayPickerInlineExample />;

export const InlineExpandable = () => <WeeklyDayPickerInlineExpandableExample />;

export const InlineMarkedDay = () => <WeeklyDayPickerInlineMarkedDaysExample />;

export default {
  title: 'Components/WeeklyDayPicker',
};
