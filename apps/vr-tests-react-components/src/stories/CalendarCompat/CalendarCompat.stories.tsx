import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Calendar } from '@fluentui/react-calendar-compat';
import { SampleCalendarCompatMultiDayView } from './utils';
import { Steps } from 'storywright';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../../utilities';

export default {
  title: 'CalendarCompat',
  decorators: [story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default').end() })],
} satisfies Meta<typeof Calendar>;

export const CalendarCompatMultiDayView = () => <SampleCalendarCompatMultiDayView daysToSelectInDayView={5} />;
CalendarCompatMultiDayView.storyName = 'multiDayView';

export const DefaultDarkMode = getStoryVariant(CalendarCompatMultiDayView, DARK_MODE);

export const DefaultHighContrast = getStoryVariant(CalendarCompatMultiDayView, HIGH_CONTRAST);

export const DefaultRTL = getStoryVariant(CalendarCompatMultiDayView, RTL);

export const ReverseCalendarCompatMultiDayView = () => <SampleCalendarCompatMultiDayView daysToSelectInDayView={-5} />;
ReverseCalendarCompatMultiDayView.storyName = 'multiDayView';
