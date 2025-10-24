import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, type StoryParameters } from 'storywright';
import { TimePicker } from '@fluentui/react-timepicker-compat';

export default {
  title: 'TimePicker compat',

  parameters: { storyWright: { steps: new Steps().snapshot('default').end() } } satisfies StoryParameters,
} satisfies Meta<typeof TimePicker>;

export const Default = () => <TimePicker open startHour={11} endHour={13} />;

export const With12HourFormat = () => <TimePicker open startHour={11} endHour={13} hourCycle="h11" />;

export const ShowSeconds = () => <TimePicker open startHour={11} endHour={13} showSeconds />;
