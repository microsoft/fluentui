import * as React from 'react';
import { CompoundButton, FluentProvider } from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

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
            <CompoundButton key={size} appearance={appearance} size={size} secondaryContent="Secondary content">
              {appearance} {size}
            </CompoundButton>
          ))}
          <CompoundButton appearance={appearance} icon={<CalendarMonth />} secondaryContent="Secondary content">
            With icon
          </CompoundButton>
          <CompoundButton
            appearance={appearance}
            icon={<CalendarMonth />}
            iconPosition="after"
            secondaryContent="Secondary content"
          >
            Icon after
          </CompoundButton>
          <CompoundButton appearance={appearance} icon={<CalendarMonth />} aria-label="Calendar" />
          <CompoundButton appearance={appearance} secondaryContent="Secondary content" disabled>
            Disabled
          </CompoundButton>
          <CompoundButton appearance={appearance} secondaryContent="Secondary content" disabledFocusable>
            Disabled focusable
          </CompoundButton>
        </div>
      ))}
      <div className={styles.row}>
        {shapes.map(shape => (
          <CompoundButton key={shape} shape={shape} secondaryContent="Secondary content">
            {shape}
          </CompoundButton>
        ))}
      </div>
    </div>
  </FluentProvider>
);
