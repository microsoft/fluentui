import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tab, TabList } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

import styles from './TabListSizeMedium.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const SizeMedium = (): JSXElement => {
  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">First Tab</Tab>
        <Tab icon={<CalendarMonth />} value="tab2">
          Second Tab
        </Tab>
        <Tab value="tab3">Third Tab</Tab>
        <Tab value="tab4">Fourth Tab</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" size="medium">
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab2" size="medium" vertical>
        {renderTabs()}
      </TabList>
    </div>
  );
};

SizeMedium.parameters = {
  docs: {
    description: {
      story: 'A tab list can have `medium` tabs (default).',
    },
  },
};
