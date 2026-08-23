import * as React from 'react';
import { Badge, FluentProvider } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['filled', 'ghost', 'outline', 'tint'] as const;
const colors = ['brand', 'danger', 'important', 'informative', 'severe', 'subtle', 'success', 'warning'] as const;
const shapes = ['circular', 'rounded', 'square'] as const;
const sizes = ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      {appearances.map(appearance => (
        <div key={appearance} className={styles.row}>
          {colors.map(color => (
            <Badge key={color} appearance={appearance} color={color}>
              {color}
            </Badge>
          ))}
        </div>
      ))}
      <div className={styles.row}>
        {sizes.map(size => (
          <Badge key={size} size={size}>
            8
          </Badge>
        ))}
      </div>
      <div className={styles.row}>
        {shapes.map(shape => (
          <Badge key={shape} shape={shape}>
            {shape}
          </Badge>
        ))}
      </div>
      <div className={styles.row}>
        <Badge icon={<CalendarMonth />}>Icon before</Badge>
        <Badge icon={<CalendarMonth />} iconPosition="after">
          Icon after
        </Badge>
        <Badge icon={<CalendarMonth />} />
        <Badge icon={<CalendarMonth />} size="extra-large">
          8
        </Badge>
      </div>
    </div>
  </FluentProvider>
);
