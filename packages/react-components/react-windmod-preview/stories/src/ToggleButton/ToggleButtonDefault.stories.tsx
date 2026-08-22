import * as React from 'react';
import { ThemeProvider, ToggleButton } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

// Bundled pair: a checked ToggleButton swaps regular → filled via data-variant.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      {appearances.map(appearance => (
        <div key={appearance} className={styles.row}>
          {sizes.map(size => (
            <ToggleButton key={size} appearance={appearance} size={size}>
              {appearance} {size}
            </ToggleButton>
          ))}
          <ToggleButton appearance={appearance} checked>
            Checked
          </ToggleButton>
          <ToggleButton appearance={appearance} checked isAccessible>
            Checked accessible
          </ToggleButton>
          <ToggleButton appearance={appearance} checked icon={<CalendarMonth />}>
            With icon
          </ToggleButton>
          <ToggleButton appearance={appearance} checked icon={<CalendarMonth />} aria-label="Calendar" />
          <ToggleButton appearance={appearance} checked disabled>
            Disabled
          </ToggleButton>
          <ToggleButton appearance={appearance} checked disabledFocusable>
            Disabled focusable
          </ToggleButton>
        </div>
      ))}
      <div className={styles.row}>
        {shapes.map(shape => (
          <ToggleButton key={shape} shape={shape} defaultChecked>
            {shape}
          </ToggleButton>
        ))}
      </div>
    </div>
  </ThemeProvider>
);
