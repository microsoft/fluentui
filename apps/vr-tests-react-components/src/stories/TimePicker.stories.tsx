import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { TimePicker } from '@fluentui/react-timepicker-compat';

export default {
  title: 'TimePicker compat',
  decorators: [
    Story => (
      <StoryWright steps={new Steps().snapshot('default').end()}>
        <Story />
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof TimePicker>;

export const Default = () => <TimePicker open startHour={11} endHour={13} />;
export const With12HourFormat = () => <TimePicker open startHour={11} endHour={13} hourCycle="h11" />;
export const ShowSeconds = () => <TimePicker open startHour={11} endHour={13} showSeconds />;
