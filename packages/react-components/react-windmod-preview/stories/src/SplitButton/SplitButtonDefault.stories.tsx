import * as React from 'react';
import { FluentProvider, SplitButton } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

// Windmod ships no Menu, so the menu button is inert here; `aria-expanded` on its slot is what
// drives the expanded look either way.
export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      {appearances.map(appearance => (
        <div key={appearance} className={styles.row}>
          {sizes.map(size => (
            <SplitButton key={size} appearance={appearance} size={size}>
              {appearance} {size}
            </SplitButton>
          ))}
          <SplitButton appearance={appearance} menuButton={{ 'aria-expanded': true }}>
            Expanded
          </SplitButton>
          <SplitButton appearance={appearance} icon={<CalendarMonth />}>
            With icon
          </SplitButton>
          <SplitButton appearance={appearance} disabled>
            Disabled
          </SplitButton>
          <SplitButton appearance={appearance} disabledFocusable>
            Disabled focusable
          </SplitButton>
        </div>
      ))}
      <div className={styles.row}>
        {shapes.map(shape => (
          <SplitButton key={shape} shape={shape}>
            {shape}
          </SplitButton>
        ))}
      </div>
    </div>
  </FluentProvider>
);
