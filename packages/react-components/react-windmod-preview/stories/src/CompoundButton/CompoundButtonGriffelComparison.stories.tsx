import * as React from 'react';
import { CompoundButton, ThemeProvider } from '@fluentui/react-windmod-preview';
import { CompoundButton as GriffelCompoundButton, FluentProvider, webLightTheme } from '@fluentui/react-components';
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
  disabled?: boolean;
  disabledFocusable?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a FluentProvider).
 * The pair in each row must be pixel-identical — this is the pilot's review surface.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    ...appearances.map(appearance => ({ label: appearance, props: { appearance } })),
    ...sizes.map(size => ({ label: size, props: { size } })),
    ...shapes.map(shape => ({ label: shape, props: { shape } })),
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
              <CompoundButton {...props} secondaryContent="Secondary content">
                Compound
              </CompoundButton>
            </ThemeProvider>
          </div>
          <div>
            <FluentProvider theme={webLightTheme}>
              <GriffelCompoundButton {...props} secondaryContent="Secondary content">
                Compound
              </GriffelCompoundButton>
            </FluentProvider>
          </div>
        </React.Fragment>
      ))}
      <div className={styles.label}>with icon</div>
      <div>
        <ThemeProvider>
          <CompoundButton icon={<CalendarMonth />} secondaryContent="Secondary content">
            Compound
          </CompoundButton>
        </ThemeProvider>
      </div>
      <div>
        <FluentProvider theme={webLightTheme}>
          <GriffelCompoundButton icon={<GriffelCalendarMonth />} secondaryContent="Secondary content">
            Compound
          </GriffelCompoundButton>
        </FluentProvider>
      </div>
      <div className={styles.label}>icon only</div>
      <div>
        <ThemeProvider>
          <CompoundButton icon={<CalendarMonth />} aria-label="Calendar" />
        </ThemeProvider>
      </div>
      <div>
        <FluentProvider theme={webLightTheme}>
          <GriffelCompoundButton icon={<GriffelCalendarMonth />} aria-label="Calendar" />
        </FluentProvider>
      </div>
      <div className={styles.label}>no secondary content</div>
      <div>
        <ThemeProvider>
          <CompoundButton>Compound</CompoundButton>
        </ThemeProvider>
      </div>
      <div>
        <FluentProvider theme={webLightTheme}>
          <GriffelCompoundButton>Compound</GriffelCompoundButton>
        </FluentProvider>
      </div>
    </div>
  );
};
