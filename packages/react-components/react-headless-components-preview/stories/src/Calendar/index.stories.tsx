import * as React from 'react';
import {
  Calendar,
  CalendarDay,
  CalendarMonth,
  CalendarYear,
} from '@fluentui/react-headless-components-preview/calendar';
import descriptionMd from './CalendarDescription.md';
import styles from './calendar.module.css';
import { getBrowserSupportNotice } from '../shared/browserSupportNotice';

export { Default } from './CalendarDefault.stories';

export default {
  title: 'Components/Calendar',
  component: Calendar,
  subcomponents: { CalendarDay, CalendarMonth, CalendarYear },
  parameters: {
    docs: {
      description: {
        component: descriptionMd + getBrowserSupportNotice('Calendar'),
      },
    },
  },
  decorators: [
    (Story: React.ComponentType): React.ReactNode => (
      <div className={styles.story}>
        <Story />
      </div>
    ),
  ],
};
