import * as React from 'react';
import { FluentProvider, Select } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Select as GriffelSelect,
  webLightTheme,
} from '@fluentui/react-components';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import {
  bundleIcon as griffelBundleIcon,
  CalendarMonthFilled as GriffelCalendarMonthFilled,
  CalendarMonthRegular as GriffelCalendarMonthRegular,
} from '@fluentui/react-icons';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

// Each side uses its own atoms and bundler: headless (data-fui-icon-variant) vs Griffel classic.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const GriffelCalendarMonth = griffelBundleIcon(GriffelCalendarMonthFilled, GriffelCalendarMonthRegular);

type LookProps = {
  appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  defaultValue?: string;
  'aria-invalid'?: boolean;
};

// The intrinsic width of a <select> comes from its longest <option>, so both sides must carry
// byte-identical option text.
const Options = (): React.ReactNode => (
  <>
    <option value="a">Apple</option>
    <option value="b">Banana</option>
  </>
);

const icon = (Icon: React.ComponentType, custom: boolean, removed: boolean) => {
  if (removed) {
    return { icon: null };
  }
  if (custom) {
    return { icon: <Icon /> };
  }
  return {};
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps; custom?: boolean; removed?: boolean }> = [
    { label: 'outline', props: { defaultValue: 'b' } },
    { label: 'underline', props: { appearance: 'underline', defaultValue: 'b' } },
    { label: 'filled-darker', props: { appearance: 'filled-darker', defaultValue: 'b' } },
    { label: 'filled-lighter', props: { appearance: 'filled-lighter', defaultValue: 'b' } },
    { label: 'small', props: { size: 'small', defaultValue: 'b' } },
    { label: 'large', props: { size: 'large', defaultValue: 'b' } },
    { label: 'invalid', props: { 'aria-invalid': true, defaultValue: 'b' } },
    { label: 'invalid underline', props: { appearance: 'underline', 'aria-invalid': true, defaultValue: 'b' } },
    { label: 'disabled', props: { disabled: true, defaultValue: 'b' } },
    { label: 'disabled underline', props: { appearance: 'underline', disabled: true, defaultValue: 'b' } },
    { label: 'icon removed', props: { defaultValue: 'b' }, removed: true },
    { label: 'custom icon, large', props: { size: 'large', defaultValue: 'b' }, custom: true },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props, custom = false, removed = false }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>
              <Select {...props} {...icon(CalendarMonth, custom, removed)}>
                <Options />
              </Select>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelSelect {...props} {...icon(GriffelCalendarMonth, custom, removed)}>
                <Options />
              </GriffelSelect>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
