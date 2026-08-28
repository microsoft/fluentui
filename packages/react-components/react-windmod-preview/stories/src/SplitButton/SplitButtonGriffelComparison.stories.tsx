import * as React from 'react';
import { FluentProvider, SplitButton } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  SplitButton as GriffelSplitButton,
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

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

type LookProps = {
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  shape?: (typeof shapes)[number];
  disabled?: boolean;
  disabledFocusable?: boolean;
  menuButton?: { 'aria-expanded'?: boolean };
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    ...appearances.map(appearance => ({ label: appearance, props: { appearance } })),
    ...sizes.map(size => ({ label: size, props: { size } })),
    ...shapes.map(shape => ({ label: shape, props: { shape } })),
    { label: 'expanded', props: { menuButton: { 'aria-expanded': true } } },
    { label: 'outline expanded', props: { appearance: 'outline', menuButton: { 'aria-expanded': true } } },
    { label: 'disabled', props: { disabled: true } },
    { label: 'disabledFocusable', props: { disabledFocusable: true } },
    { label: 'primary disabled', props: { appearance: 'primary', disabled: true } },
    { label: 'subtle disabled', props: { appearance: 'subtle', disabled: true } },
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
            <FluentProvider>
              <SplitButton {...props}>Send</SplitButton>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelSplitButton {...props}>Send</GriffelSplitButton>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
      <div className={styles.label}>with icon</div>
      <div>
        <FluentProvider>
          <SplitButton icon={<CalendarMonth />}>Send</SplitButton>
        </FluentProvider>
      </div>
      <div>
        <GriffelFluentProvider theme={webLightTheme}>
          <GriffelSplitButton icon={<GriffelCalendarMonth />}>Send</GriffelSplitButton>
        </GriffelFluentProvider>
      </div>
      <div className={styles.label}>icon after</div>
      <div>
        <FluentProvider>
          <SplitButton icon={<CalendarMonth />} iconPosition="after">
            Send
          </SplitButton>
        </FluentProvider>
      </div>
      <div>
        <GriffelFluentProvider theme={webLightTheme}>
          <GriffelSplitButton icon={<GriffelCalendarMonth />} iconPosition="after">
            Send
          </GriffelSplitButton>
        </GriffelFluentProvider>
      </div>
      <div className={styles.label}>rtl</div>
      <div>
        <FluentProvider dir="rtl">
          <SplitButton icon={<CalendarMonth />}>Send</SplitButton>
        </FluentProvider>
      </div>
      <div>
        <GriffelFluentProvider theme={webLightTheme} dir="rtl">
          <GriffelSplitButton icon={<GriffelCalendarMonth />}>Send</GriffelSplitButton>
        </GriffelFluentProvider>
      </div>
    </div>
  );
};
