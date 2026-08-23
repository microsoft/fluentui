import * as React from 'react';
import { FluentProvider, MenuButton } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

// Bundled pair: an expanded MenuButton swaps regular → filled via data-variant.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      {appearances.map(appearance => (
        <div key={appearance} className={styles.row}>
          {sizes.map(size => (
            <MenuButton key={size} appearance={appearance} size={size}>
              {appearance} {size}
            </MenuButton>
          ))}
          <MenuButton appearance={appearance} aria-expanded>
            Expanded
          </MenuButton>
          <MenuButton appearance={appearance} aria-expanded icon={<CalendarMonth />}>
            With icon
          </MenuButton>
          <MenuButton appearance={appearance} aria-expanded icon={<CalendarMonth />} aria-label="Calendar" />
          <MenuButton appearance={appearance} aria-expanded aria-label="Menu" />
          <MenuButton appearance={appearance} aria-expanded disabled>
            Disabled
          </MenuButton>
          <MenuButton appearance={appearance} aria-expanded disabledFocusable>
            Disabled focusable
          </MenuButton>
        </div>
      ))}
      <div className={styles.row}>
        {shapes.map(shape => (
          <MenuButton key={shape} shape={shape} aria-expanded>
            {shape}
          </MenuButton>
        ))}
      </div>
    </div>
  </FluentProvider>
);
