import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Select } from '@fluentui/react-windmod-preview/select';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

const Options = (): React.ReactNode => (
  <>
    <option value="a">Apple</option>
    <option value="b">Banana</option>
  </>
);

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Select key={appearance} appearance={appearance}>
            <Options />
          </Select>
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Select key={size} size={size}>
            <Options />
          </Select>
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Select key={appearance} appearance={appearance} aria-invalid>
            <Options />
          </Select>
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Select key={appearance} appearance={appearance} disabled>
            <Options />
          </Select>
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Select key={size} size={size} icon={null}>
            <Options />
          </Select>
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Select key={size} size={size} icon={<CalendarMonth />}>
            <Options />
          </Select>
        ))}
      </div>
    </div>
  </FluentProvider>
);
