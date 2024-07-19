import * as React from 'react';
import type { Meta } from '@storybook/react';
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
        <div style={{ display: 'flex' }}>
          <div className="testWrapper" style={{ overflow: 'hidden' }}>
            {story()}
          </div>
        </div>
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export const Default = () => (
  <div style={{ padding: '10px' }}>
    <DatePicker input={{ className: 'datepicker-input' }} />
  </div>
);
Default.storyName = 'default';

export const DefaultHightContrast = getStoryVariant(Default, HIGH_CONTRAST);

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
