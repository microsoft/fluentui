import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tab, TabList } from '@fluentui/react-windmod-preview/tab-list';
import {
  FluentProvider as GriffelFluentProvider,
  Tab as GriffelTab,
  TabList as GriffelTabList,
  webLightTheme,
} from '@fluentui/react-components';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';
import {
  bundleIcon as griffelBundleIcon,
  CalendarMonthFilled as GriffelCalendarMonthFilled,
  CalendarMonthRegular as GriffelCalendarMonthRegular,
} from '@fluentui/react-icons';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const GriffelCalendarMonth = griffelBundleIcon(GriffelCalendarMonthFilled, GriffelCalendarMonthRegular);

type ListProps = {
  appearance?: 'transparent' | 'subtle' | 'subtle-circular' | 'filled-circular';
  size?: 'small' | 'medium' | 'large';
  reserveSelectedTabSpace?: boolean;
  vertical?: boolean;
  disabled?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; list: ListProps; withIcon?: boolean; tabDisabled?: boolean }> = [
    { label: 'transparent', list: {} },
    { label: 'subtle', list: { appearance: 'subtle' } },
    { label: 'subtle-circular', list: { appearance: 'subtle-circular' } },
    { label: 'filled-circular', list: { appearance: 'filled-circular' } },
    { label: 'small', list: { size: 'small' } },
    { label: 'large', list: { size: 'large' } },
    { label: 'vertical', list: { vertical: true } },
    { label: 'with icon', list: {}, withIcon: true },
    { label: 'large with icon', list: { size: 'large' }, withIcon: true },
    { label: 'no reserved space', list: { reserveSelectedTabSpace: false } },
    { label: 'list disabled', list: { disabled: true } },
    { label: 'tab disabled', list: {}, tabDisabled: true },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, list, withIcon, tabDisabled }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>
              <TabList {...list} selectedValue="a">
                <Tab value="a" icon={withIcon ? <CalendarMonth /> : undefined}>
                  Tab A
                </Tab>
                <Tab value="b" icon={withIcon ? <CalendarMonth /> : undefined} disabled={tabDisabled}>
                  Tab B
                </Tab>
              </TabList>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelTabList {...list} selectedValue="a">
                <GriffelTab value="a" icon={withIcon ? <GriffelCalendarMonth /> : undefined}>
                  Tab A
                </GriffelTab>
                <GriffelTab value="b" icon={withIcon ? <GriffelCalendarMonth /> : undefined} disabled={tabDisabled}>
                  Tab B
                </GriffelTab>
              </GriffelTabList>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
