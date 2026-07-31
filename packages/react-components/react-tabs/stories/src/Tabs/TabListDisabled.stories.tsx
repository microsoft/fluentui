import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tab, TabList } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

import styles from './TabListDisabled.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Disabled = (): JSXElement => {
  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" disabled>
        <Tab icon={<CalendarMonth />} value="tab1">
          First Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab2">
          Second Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab3">
          Third Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab4">
          Fourth Tab
        </Tab>
      </TabList>
      <TabList defaultSelectedValue="tab2">
        <Tab icon={<CalendarMonth />} value="tab1">
          First Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab2" disabled>
          Second Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab3" disabled>
          Third Tab
        </Tab>
        <Tab icon={<CalendarMonth />} value="tab4">
          Fourth Tab
        </Tab>
      </TabList>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story:
        'A tab list can disable interaction for all its tabs. The default is `false`.' +
        ' Individual tabs can also be disabled.',
    },
  },
};
