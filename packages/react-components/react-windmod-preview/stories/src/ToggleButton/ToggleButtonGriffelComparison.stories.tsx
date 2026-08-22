import * as React from 'react';
import { ThemeProvider, ToggleButton } from '@fluentui/react-windmod-preview';
import { FluentProvider, ToggleButton as GriffelToggleButton, webLightTheme } from '@fluentui/react-components';
import { bundleIcon as griffelBundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

// Each side bundles with its own mechanism: headless (data-variant) vs Griffel classic.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const GriffelCalendarMonth = griffelBundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

type LookProps = {
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  shape?: (typeof shapes)[number];
  checked?: boolean;
  isAccessible?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a FluentProvider).
 * The pair in each row must be pixel-identical — this is the pilot's review surface.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    ...appearances.map(appearance => ({ label: appearance, props: { appearance, checked: true } })),
    ...appearances.map(appearance => ({
      label: `${appearance} accessible`,
      props: { appearance, checked: true, isAccessible: true },
    })),
    ...sizes.map(size => ({ label: size, props: { size, checked: true } })),
    ...shapes.map(shape => ({ label: shape, props: { shape, checked: true } })),
    { label: 'unchecked', props: {} },
    { label: 'checked disabled', props: { checked: true, disabled: true } },
    { label: 'checked disabledFocusable', props: { checked: true, disabledFocusable: true } },
    { label: 'outline disabled', props: { appearance: 'outline', disabled: true } },
    { label: 'primary checked disabled', props: { appearance: 'primary', checked: true, disabled: true } },
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
              <ToggleButton {...props}>Toggle</ToggleButton>
            </ThemeProvider>
          </div>
          <div>
            <FluentProvider theme={webLightTheme}>
              <GriffelToggleButton {...props}>Toggle</GriffelToggleButton>
            </FluentProvider>
          </div>
        </React.Fragment>
      ))}
      <div className={styles.label}>checked with icon</div>
      <div>
        <ThemeProvider>
          <ToggleButton checked icon={<CalendarMonth />}>
            Toggle
          </ToggleButton>
        </ThemeProvider>
      </div>
      <div>
        <FluentProvider theme={webLightTheme}>
          <GriffelToggleButton checked icon={<GriffelCalendarMonth />}>
            Toggle
          </GriffelToggleButton>
        </FluentProvider>
      </div>
      <div className={styles.label}>checked icon only</div>
      <div>
        <ThemeProvider>
          <ToggleButton checked icon={<CalendarMonth />} aria-label="Calendar" />
        </ThemeProvider>
      </div>
      <div>
        <FluentProvider theme={webLightTheme}>
          <GriffelToggleButton checked icon={<GriffelCalendarMonth />} aria-label="Calendar" />
        </FluentProvider>
      </div>
    </div>
  );
};
