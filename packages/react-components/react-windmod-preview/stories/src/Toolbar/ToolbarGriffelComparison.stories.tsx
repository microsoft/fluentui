import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioButton,
  ToolbarRadioGroup,
  ToolbarToggleButton,
} from '@fluentui/react-windmod-preview/toolbar';
import {
  FluentProvider as GriffelFluentProvider,
  Toolbar as GriffelToolbar,
  ToolbarButton as GriffelToolbarButton,
  ToolbarDivider as GriffelToolbarDivider,
  ToolbarGroup as GriffelToolbarGroup,
  ToolbarRadioButton as GriffelToolbarRadioButton,
  ToolbarRadioGroup as GriffelToolbarRadioGroup,
  ToolbarToggleButton as GriffelToolbarToggleButton,
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

type Appearance = 'primary' | 'subtle' | 'transparent';
type Size = 'small' | 'medium' | 'large';

type Family = {
  Toolbar: React.ComponentType<{
    size?: Size;
    vertical?: boolean;
    defaultCheckedValues?: Record<string, string[]>;
    style?: React.CSSProperties;
    'aria-label'?: string;
    children?: React.ReactNode;
  }>;
  ToolbarButton: React.ComponentType<{
    appearance?: Appearance;
    vertical?: boolean;
    disabled?: boolean;
    disabledFocusable?: boolean;
    icon?: React.ReactElement;
    'aria-label'?: string;
    children?: React.ReactNode;
  }>;
  ToolbarToggleButton: React.ComponentType<{
    name: string;
    value: string;
    appearance?: Appearance;
    disabled?: boolean;
    icon?: React.ReactElement;
    children?: React.ReactNode;
  }>;
  ToolbarRadioButton: Family['ToolbarToggleButton'];
  ToolbarDivider: React.ComponentType<Record<string, never>>;
  ToolbarGroup: React.ComponentType<{ children?: React.ReactNode }>;
  ToolbarRadioGroup: Family['ToolbarGroup'];
  Icon: React.ComponentType;
};

const windmod: Family = {
  Toolbar,
  ToolbarButton,
  ToolbarToggleButton,
  ToolbarRadioButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioGroup,
  Icon: CalendarMonth,
};

const griffel: Family = {
  Toolbar: GriffelToolbar,
  ToolbarButton: GriffelToolbarButton,
  ToolbarToggleButton: GriffelToolbarToggleButton,
  ToolbarRadioButton: GriffelToolbarRadioButton,
  ToolbarDivider: GriffelToolbarDivider,
  ToolbarGroup: GriffelToolbarGroup,
  ToolbarRadioGroup: GriffelToolbarRadioGroup,
  Icon: GriffelCalendarMonth,
};

const cells: Array<{ label: string; render: (f: Family) => React.ReactNode }> = [
  {
    label: 'small',
    render: ({ Toolbar: T, ToolbarButton: B, Icon }) => (
      <T size="small" aria-label="small">
        <B icon={<Icon />}>Label</B>
        <B icon={<Icon />} aria-label="icon" />
      </T>
    ),
  },
  {
    label: 'medium',
    render: ({ Toolbar: T, ToolbarButton: B, Icon }) => (
      <T aria-label="medium">
        <B icon={<Icon />}>Label</B>
        <B icon={<Icon />} aria-label="icon" />
      </T>
    ),
  },
  {
    label: 'large',
    render: ({ Toolbar: T, ToolbarButton: B, Icon }) => (
      <T size="large" aria-label="large">
        <B icon={<Icon />}>Label</B>
        <B icon={<Icon />} aria-label="icon" />
      </T>
    ),
  },
  {
    label: 'vertical toolbar',
    render: ({ Toolbar: T, ToolbarButton: B, ToolbarDivider: D, Icon }) => (
      <T vertical aria-label="vertical">
        <B icon={<Icon />}>One</B>
        <D />
        <B icon={<Icon />}>Two</B>
      </T>
    ),
  },
  {
    label: 'vertical buttons',
    render: ({ Toolbar: T, ToolbarButton: B, Icon }) => (
      <T aria-label="vertical buttons">
        <B vertical icon={<Icon />}>
          Stacked
        </B>
        <B vertical icon={<Icon />} aria-label="icon" />
      </T>
    ),
  },
  {
    label: 'appearances',
    render: ({ Toolbar: T, ToolbarButton: B, Icon }) => (
      <T aria-label="appearances">
        <B appearance="primary" icon={<Icon />}>
          Primary
        </B>
        <B appearance="subtle" icon={<Icon />}>
          Subtle
        </B>
        <B appearance="transparent" icon={<Icon />}>
          Transparent
        </B>
      </T>
    ),
  },
  {
    label: 'disabled',
    render: ({ Toolbar: T, ToolbarButton: B, Icon }) => (
      <T aria-label="disabled">
        <B icon={<Icon />} disabled>
          Disabled
        </B>
        <B icon={<Icon />} disabledFocusable>
          Focusable
        </B>
      </T>
    ),
  },
  {
    label: 'toggle checked',
    render: ({ Toolbar: T, ToolbarToggleButton: Tg, Icon }) => (
      <T defaultCheckedValues={{ t: ['on'] }} aria-label="toggle">
        <Tg name="t" value="on" icon={<Icon />}>
          On
        </Tg>
        <Tg name="t" value="off" icon={<Icon />}>
          Off
        </Tg>
      </T>
    ),
  },
  {
    label: 'toggle checked disabled',
    render: ({ Toolbar: T, ToolbarToggleButton: Tg, Icon }) => (
      <T defaultCheckedValues={{ t: ['on'] }} aria-label="toggle disabled">
        <Tg name="t" value="on" icon={<Icon />} disabled>
          On
        </Tg>
        <Tg name="t" value="on" appearance="primary" icon={<Icon />} disabled>
          Primary
        </Tg>
      </T>
    ),
  },
  {
    label: 'radio group',
    render: ({ Toolbar: T, ToolbarRadioGroup: Rg, ToolbarRadioButton: R, Icon }) => (
      <T defaultCheckedValues={{ r: ['a'] }} aria-label="radio">
        <Rg>
          <R name="r" value="a" icon={<Icon />}>
            A
          </R>
          <R name="r" value="b" icon={<Icon />}>
            B
          </R>
        </Rg>
      </T>
    ),
  },
  {
    label: 'far group',
    render: ({ Toolbar: T, ToolbarGroup: G, ToolbarButton: B, Icon }) => (
      <T style={{ width: 320, justifyContent: 'space-between' }} aria-label="far group">
        <G>
          <B icon={<Icon />}>Near</B>
        </G>
        <G>
          <B icon={<Icon />}>Far</B>
        </G>
      </T>
    ),
  },
];

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.grid}>
    <div className={styles.header}>Variant</div>
    <div className={styles.header}>Windmod</div>
    <div className={styles.header}>Griffel</div>
    {cells.map(({ label, render }) => (
      <React.Fragment key={label}>
        <div className={styles.label}>{label}</div>
        <FluentProvider>{render(windmod)}</FluentProvider>
        <GriffelFluentProvider theme={webLightTheme}>{render(griffel)}</GriffelFluentProvider>
      </React.Fragment>
    ))}
  </div>
);
