import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tab, TabList } from '@fluentui/react-windmod-preview/tab-list';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['transparent', 'subtle', 'subtle-circular', 'filled-circular'] as const;
const sizes = ['small', 'medium', 'large'] as const;

const tabs = (
  <>
    <Tab value="a">Tab A</Tab>
    <Tab value="b">Tab B</Tab>
    <Tab value="c">Tab C</Tab>
  </>
);

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <TabList key={appearance} appearance={appearance} defaultSelectedValue="a">
            {tabs}
          </TabList>
        ))}
      </div>

      <div className={styles.row}>
        {sizes.map(size => (
          <TabList key={size} size={size} defaultSelectedValue="a">
            {tabs}
          </TabList>
        ))}
      </div>

      <div className={styles.row}>
        <TabList defaultSelectedValue="a">{tabs}</TabList>
        <TabList vertical defaultSelectedValue="a">
          {tabs}
        </TabList>
      </div>

      <div className={styles.row}>
        <TabList defaultSelectedValue="a">
          <Tab value="a" icon={<CalendarMonth />}>
            Tab A
          </Tab>
          <Tab value="b" icon={<CalendarMonth />}>
            Tab B
          </Tab>
        </TabList>
        <TabList defaultSelectedValue="a">
          <Tab value="a" icon={<CalendarMonth />} />
          <Tab value="b" icon={<CalendarMonth />} />
        </TabList>
      </div>

      <div className={styles.row}>
        <TabList defaultSelectedValue="a">{tabs}</TabList>
        <TabList reserveSelectedTabSpace={false} defaultSelectedValue="a">
          {tabs}
        </TabList>
      </div>

      <div className={styles.row}>
        <TabList disabled defaultSelectedValue="a">
          {tabs}
        </TabList>
        <TabList defaultSelectedValue="a">
          <Tab value="a">Tab A</Tab>
          <Tab value="b" disabled>
            Tab B
          </Tab>
          <Tab value="c">Tab C</Tab>
        </TabList>
      </div>
    </div>
  </FluentProvider>
);
