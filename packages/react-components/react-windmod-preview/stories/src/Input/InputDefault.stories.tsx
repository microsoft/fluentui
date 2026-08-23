import * as React from 'react';
import { FluentProvider, Input } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
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
          <Input key={appearance} appearance={appearance} defaultValue={appearance} />
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Input key={size} size={size} defaultValue={size} />
        ))}
      </div>
      <div className={styles.row}>
        <Input contentBefore={<CalendarMonth />} defaultValue="Content before" />
        <Input contentAfter={<CalendarMonth />} defaultValue="Content after" />
        <Input contentBefore={<CalendarMonth />} contentAfter={<CalendarMonth />} defaultValue="Both" />
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Input key={size} size={size} placeholder={`Placeholder ${size}`} />
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Input key={appearance} appearance={appearance} aria-invalid defaultValue="Invalid" />
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Input key={appearance} appearance={appearance} disabled defaultValue="Disabled" />
        ))}
      </div>
    </div>
  </FluentProvider>
);
