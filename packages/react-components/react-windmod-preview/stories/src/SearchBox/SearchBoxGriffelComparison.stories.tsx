import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { SearchBox } from '@fluentui/react-windmod-preview/search-box';
import {
  FluentProvider as GriffelFluentProvider,
  SearchBox as GriffelSearchBox,
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
  placeholder?: string;
  defaultValue?: string;
  'aria-invalid'?: boolean;
  contentBefore?: null;
  contentAfter?: null;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps; glyph?: boolean }> = [
    { label: 'outline', props: { defaultValue: 'Text' } },
    { label: 'underline', props: { appearance: 'underline', defaultValue: 'Text' } },
    { label: 'filled-darker', props: { appearance: 'filled-darker', defaultValue: 'Text' } },
    { label: 'filled-lighter', props: { appearance: 'filled-lighter', defaultValue: 'Text' } },
    { label: 'small', props: { size: 'small', defaultValue: 'Text' } },
    { label: 'large', props: { size: 'large', defaultValue: 'Text' } },
    { label: 'placeholder', props: { placeholder: 'Placeholder' } },
    { label: 'invalid', props: { 'aria-invalid': true, defaultValue: 'Text' } },
    { label: 'disabled', props: { disabled: true, defaultValue: 'Text' } },
    { label: 'disabled filled-darker', props: { appearance: 'filled-darker', disabled: true, placeholder: 'Ph' } },
    { label: 'no magnifier', props: { contentBefore: null, defaultValue: 'Text' } },
    { label: 'no dismiss', props: { contentAfter: null, defaultValue: 'Text' } },
    { label: 'custom glyph', props: { defaultValue: 'Text' }, glyph: true },
    { label: 'custom glyph, large', props: { size: 'large', defaultValue: 'Text' }, glyph: true },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props, glyph = false }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>
              <SearchBox {...props} contentBefore={glyph ? <CalendarMonth /> : props.contentBefore} />
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelSearchBox {...props} contentBefore={glyph ? <GriffelCalendarMonth /> : props.contentBefore} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
