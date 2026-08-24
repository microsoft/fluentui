import * as React from 'react';
import { FluentProvider, SearchBox } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <SearchBox key={appearance} appearance={appearance} defaultValue={appearance} />
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <SearchBox key={size} size={size} defaultValue={size} />
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <SearchBox key={size} size={size} placeholder={`Placeholder ${size}`} />
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <SearchBox key={appearance} appearance={appearance} disabled defaultValue="Disabled" />
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <SearchBox key={appearance} appearance={appearance} aria-invalid defaultValue="Invalid" />
        ))}
      </div>
      <div className={styles.row}>
        <SearchBox contentBefore={null} defaultValue="No magnifier" />
        <SearchBox contentBefore={<CalendarMonth />} defaultValue="Custom glyph" />
        <SearchBox contentAfter={null} defaultValue="No dismiss" />
      </div>
    </div>
  </FluentProvider>
);
