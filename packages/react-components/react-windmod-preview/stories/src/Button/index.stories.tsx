import * as React from 'react';
import { Button, ThemeProvider } from '@fluentui/react-windmod-preview';
import type { ButtonProps } from '@fluentui/react-windmod-preview';
import { Button as GriffelButton, FluentProvider, webLightTheme } from '@fluentui/react-components';
// Classic (Griffel-styled) icons on BOTH sides: @fluentui/react-icons/headless ships only
// the FACTORIES (createFluentIcon/bundleIcon) as of 2.0.337 — no premade Griffel-free
// components yet. Demo-layer-only; the windmod library itself imports no icons.
import { CalendarMonthRegular } from '@fluentui/react-icons';

import styles from '../compare.module.css';

export default {
  title: 'Windmod/Button',
  component: Button,
};

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;
const sizes = ['small', 'medium', 'large'] as const;
const shapes = ['rounded', 'circular', 'square'] as const;

export const Default = (): React.ReactNode => (
  <ThemeProvider>
    <div className={styles.stack}>
      {appearances.map(appearance => (
        <div key={appearance} className={styles.row}>
          {sizes.map(size => (
            <Button key={size} appearance={appearance} size={size}>
              {appearance} {size}
            </Button>
          ))}
          <Button appearance={appearance} icon={<CalendarMonthRegular />}>
            With icon
          </Button>
          <Button appearance={appearance} icon={<CalendarMonthRegular />} iconPosition="after">
            Icon after
          </Button>
          <Button appearance={appearance} icon={<CalendarMonthRegular />} aria-label="Calendar" />
          <Button appearance={appearance} disabled>
            Disabled
          </Button>
          <Button appearance={appearance} disabledFocusable>
            Disabled focusable
          </Button>
        </div>
      ))}
      <div className={styles.row}>
        {shapes.map(shape => (
          <Button key={shape} shape={shape} icon={shape === 'rounded' ? undefined : <CalendarMonthRegular />}>
            {shape}
          </Button>
        ))}
      </div>
    </div>
  </ThemeProvider>
);

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
          <Button icon={<CalendarMonthRegular />}>Button</Button>
        </ThemeProvider>
      </div>
      <div>
        <FluentProvider theme={webLightTheme}>
          <GriffelButton icon={<CalendarMonthRegular />}>Button</GriffelButton>
        </FluentProvider>
      </div>
      <div className={styles.label}>icon only</div>
      <div>
        <ThemeProvider>
          <Button icon={<CalendarMonthRegular />} aria-label="Calendar" />
        </ThemeProvider>
      </div>
      <div>
        <FluentProvider theme={webLightTheme}>
          <GriffelButton icon={<CalendarMonthRegular />} aria-label="Calendar" />
        </FluentProvider>
      </div>
    </div>
  );
};
