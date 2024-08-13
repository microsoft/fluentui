import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { TimePicker } from '@fluentui/react-timepicker-compat';

import { withStoryWrightSteps } from '../utilities';

export default {
  title: 'TimePicker compat',

  decorators: [story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default').end() })],
} satisfies Meta<typeof TimePicker>;

export const Default = () => <TimePicker open startHour={11} endHour={13} />;

export const With12HourFormat = () => <TimePicker open startHour={11} endHour={13} hourCycle="h11" />;

export const ShowSeconds = () => <TimePicker open startHour={11} endHour={13} showSeconds />;
