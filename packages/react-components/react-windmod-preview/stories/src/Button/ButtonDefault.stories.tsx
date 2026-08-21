import * as React from 'react';
import { Button, ThemeProvider } from '@fluentui/react-windmod-preview';
import { CalendarMonthRegular } from '@fluentui/react-icons';

import styles from '../compare.module.css';

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      {appearances.map(appearance => (
        <div key={appearance} className={styles.row}>
          {sizes.map(size => (
            <Button key={size} appearance={appearance} size={size}>
              {appearance} {size}
            </Button>
          ))}
          <Button appearance={appearance} icon={<CalendarMonthRegular />}>
            With icon
          </Button>
          <Button appearance={appearance} icon={<CalendarMonthRegular />} iconPosition="after">
            Icon after
          </Button>
          <Button appearance={appearance} icon={<CalendarMonthRegular />} aria-label="Calendar" />
          <Button appearance={appearance} disabled>
            Disabled
          </Button>
          <Button appearance={appearance} disabledFocusable>
            Disabled focusable
          </Button>
        </div>
      ))}
      <div className={styles.row}>
        {shapes.map(shape => (
          <Button key={shape} shape={shape} icon={shape === 'rounded' ? undefined : <CalendarMonthRegular />}>
            {shape}
          </Button>
        ))}
      </div>
    </div>
  </ThemeProvider>
);
