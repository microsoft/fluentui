import * as React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, TestWrapperDecorator } from '../../utilities';

export default {
  title: 'DatePicker Compat',
  component: DatePicker,
  decorators: [
    TestWrapperDecorator,
    story => (
      <StoryWright
        steps={new Steps()
          .snapshot('rest', { cropTo: '.testWrapper' })
          .click('.datepicker-input')
          .snapshot('opened', { cropTo: '.testWrapper' })
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

type Story = StoryFn<typeof DatePicker>;

export const Default: Story = () => <DatePicker input={{ className: 'datepicker-input' }} />;
Default.storyName = 'default';

export const DefaultHightContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
