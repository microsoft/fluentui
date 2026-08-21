import * as React from 'react';
import { Button, ThemeProvider } from '@fluentui/react-windmod-preview';
import type { ButtonProps } from '@fluentui/react-windmod-preview';
import { Button as GriffelButton, FluentProvider, webLightTheme } from '@fluentui/react-components';
import { bundleIcon as griffelBundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

// Each side bundles with its own mechanism: headless (data-variant) vs Griffel classic.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const GriffelCalendarMonth = griffelBundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

/**
 * Every windmod variant next to its Griffel-suite twin (inside a FluentProvider).
 * The pair in each row must be pixel-identical — this is the pilot's review surface.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: Partial<ButtonProps> }> = [
    ...appearances.map(appearance => ({ label: appearance, props: { appearance } as Partial<ButtonProps> })),
    ...sizes.map(size => ({ label: size, props: { size } as Partial<ButtonProps> })),
    ...shapes.map(shape => ({ label: shape, props: { shape } as Partial<ButtonProps> })),
    { label: 'disabled', props: { disabled: true } },
    { label: 'disabledFocusable', props: { disabledFocusable: true } },
    { label: 'primary disabled', props: { appearance: 'primary', disabled: true } },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <ThemeProvider>
              <Button {...props}>Button</Button>
            </ThemeProvider>
          </div>
          <div>
            <FluentProvider theme={webLightTheme}>
              <GriffelButton {...(props as object)}>Button</GriffelButton>
            </FluentProvider>
          </div>
        </React.Fragment>
      ))}
      <div className={styles.label}>with icon</div>
      <div>
        <ThemeProvider>
          <Button icon={<CalendarMonth />}>Button</Button>
        </ThemeProvider>
      </div>
      <div>
        <FluentProvider theme={webLightTheme}>
          <GriffelButton icon={<GriffelCalendarMonth />}>Button</GriffelButton>
        </FluentProvider>
      </div>
      <div className={styles.label}>icon only</div>
      <div>
        <ThemeProvider>
          <Button icon={<CalendarMonth />} aria-label="Calendar" />
        </ThemeProvider>
      </div>
      <div>
        <FluentProvider theme={webLightTheme}>
          <GriffelButton icon={<GriffelCalendarMonth />} aria-label="Calendar" />
        </FluentProvider>
      </div>
    </div>
  );
};
