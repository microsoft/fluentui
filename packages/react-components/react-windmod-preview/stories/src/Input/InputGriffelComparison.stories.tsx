import * as React from 'react';
import { Input, ThemeProvider } from '@fluentui/react-windmod-preview';
import { FluentProvider, Input as GriffelInput, webLightTheme } from '@fluentui/react-components';
import { bundleIcon as griffelBundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

// Each side bundles with its own mechanism: headless (data-variant) vs Griffel classic.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const GriffelCalendarMonth = griffelBundleIcon(CalendarMonthFilled, CalendarMonthRegular);

type LookProps = {
  appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  'aria-invalid'?: boolean;
};

const slots = (Icon: React.ComponentType, before: boolean, after: boolean) => ({
  contentBefore: before ? <Icon /> : undefined,
  contentAfter: after ? <Icon /> : undefined,
});

/**
 * Every windmod variant next to its Griffel-suite twin (inside a FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps; before?: boolean; after?: boolean }> = [
    { label: 'outline', props: { defaultValue: 'Text' } },
    { label: 'underline', props: { appearance: 'underline', defaultValue: 'Text' } },
    { label: 'filled-darker', props: { appearance: 'filled-darker', defaultValue: 'Text' } },
    { label: 'filled-lighter', props: { appearance: 'filled-lighter', defaultValue: 'Text' } },
    { label: 'small', props: { size: 'small', defaultValue: 'Text' } },
    { label: 'large', props: { size: 'large', defaultValue: 'Text' } },
    { label: 'placeholder', props: { placeholder: 'Placeholder' } },
    { label: 'invalid', props: { 'aria-invalid': true, defaultValue: 'Text' } },
    { label: 'invalid underline', props: { appearance: 'underline', 'aria-invalid': true, defaultValue: 'Text' } },
    { label: 'disabled', props: { disabled: true, defaultValue: 'Text' } },
    { label: 'disabled filled-darker', props: { appearance: 'filled-darker', disabled: true, placeholder: 'Ph' } },
    { label: 'content before', props: { defaultValue: 'Text' }, before: true },
    { label: 'content after', props: { defaultValue: 'Text' }, after: true },
    { label: 'both, large', props: { size: 'large', defaultValue: 'Text' }, before: true, after: true },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props, before = false, after = false }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <ThemeProvider>
              <Input {...props} {...slots(CalendarMonth, before, after)} />
            </ThemeProvider>
          </div>
          <div>
            <FluentProvider theme={webLightTheme}>
              <GriffelInput {...props} {...slots(GriffelCalendarMonth, before, after)} />
            </FluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
