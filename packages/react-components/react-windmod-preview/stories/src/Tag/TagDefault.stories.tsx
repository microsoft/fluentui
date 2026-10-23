import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tag } from '@fluentui/react-windmod-preview/tag';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['filled', 'outline', 'brand'] as const;
const shapes = ['rounded', 'circular'] as const;
const sizes = ['medium', 'small', 'extra-small'] as const;

const mediaBox = <i style={{ display: 'block', width: 20, height: 20, background: '#8a8886' }} />;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <Tag key={size} size={size}>
            {size}
          </Tag>
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Tag key={appearance} appearance={appearance}>
            {appearance}
          </Tag>
        ))}
      </div>
      <div className={styles.row}>
        {shapes.map(shape => (
          <Tag key={shape} shape={shape}>
            {shape}
          </Tag>
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Tag key={appearance} appearance={appearance} disabled>
            {appearance} disabled
          </Tag>
        ))}
      </div>
      <div className={styles.row}>
        {appearances.map(appearance => (
          <Tag key={appearance} appearance={appearance} selected>
            {appearance} selected
          </Tag>
        ))}
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Tag key={size} size={size} dismissible>
            {size} dismissible
          </Tag>
        ))}
      </div>
      <div className={styles.row}>
        <Tag media={mediaBox}>Media</Tag>
        <Tag icon={<CalendarMonth />}>Icon</Tag>
      </div>
      <div className={styles.row}>
        {sizes.map(size => (
          <Tag key={size} size={size} secondaryText="Secondary">
            Primary
          </Tag>
        ))}
      </div>
    </div>
  </FluentProvider>
);
