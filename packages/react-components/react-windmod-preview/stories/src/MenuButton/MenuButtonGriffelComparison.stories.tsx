import * as React from 'react';
import { FluentProvider, MenuButton } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  MenuButton as GriffelMenuButton,
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

// Each side uses its own atoms and bundler: headless (data-variant) vs Griffel classic.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const GriffelCalendarMonth = griffelBundleIcon(GriffelCalendarMonthFilled, GriffelCalendarMonthRegular);

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

type LookProps = {
  appearance?: (typeof appearances)[number];
  size?: (typeof sizes)[number];
  shape?: (typeof shapes)[number];
  'aria-expanded'?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    ...appearances.map(appearance => ({ label: appearance, props: { appearance, 'aria-expanded': true } })),
    ...sizes.map(size => ({ label: size, props: { size, 'aria-expanded': true } })),
    ...shapes.map(shape => ({ label: shape, props: { shape, 'aria-expanded': true } })),
    { label: 'collapsed', props: {} },
    { label: 'expanded disabled', props: { 'aria-expanded': true, disabled: true } },
    { label: 'expanded disabledFocusable', props: { 'aria-expanded': true, disabledFocusable: true } },
    { label: 'outline disabled', props: { appearance: 'outline', disabled: true } },
    { label: 'primary expanded disabled', props: { appearance: 'primary', 'aria-expanded': true, disabled: true } },
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
              <MenuButton {...props}>Menu</MenuButton>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelMenuButton {...props}>Menu</GriffelMenuButton>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
      <div className={styles.label}>expanded with icon</div>
      <div>
        <FluentProvider>
          <MenuButton aria-expanded icon={<CalendarMonth />}>
            Menu
          </MenuButton>
        </FluentProvider>
      </div>
      <div>
        <GriffelFluentProvider theme={webLightTheme}>
          <GriffelMenuButton aria-expanded icon={<GriffelCalendarMonth />}>
            Menu
          </GriffelMenuButton>
        </GriffelFluentProvider>
      </div>
      <div className={styles.label}>expanded icon only</div>
      <div>
        <FluentProvider>
          <MenuButton aria-expanded icon={<CalendarMonth />} aria-label="Calendar" />
        </FluentProvider>
      </div>
      <div>
        <GriffelFluentProvider theme={webLightTheme}>
          <GriffelMenuButton aria-expanded icon={<GriffelCalendarMonth />} aria-label="Calendar" />
        </GriffelFluentProvider>
      </div>
      <div className={styles.label}>chevron only</div>
      <div>
        <FluentProvider>
          <MenuButton aria-expanded aria-label="Menu" />
        </FluentProvider>
      </div>
      <div>
        <GriffelFluentProvider theme={webLightTheme}>
          <GriffelMenuButton aria-expanded aria-label="Menu" />
        </GriffelFluentProvider>
      </div>
    </div>
  );
};
