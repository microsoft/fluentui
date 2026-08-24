import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  FluentProvider,
} from '@fluentui/react-windmod-preview';
import {
  Breadcrumb as GriffelBreadcrumb,
  BreadcrumbButton as GriffelBreadcrumbButton,
  BreadcrumbDivider as GriffelBreadcrumbDivider,
  BreadcrumbItem as GriffelBreadcrumbItem,
  FluentProvider as GriffelFluentProvider,
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

type Size = 'small' | 'medium' | 'large';

type Family = {
  Breadcrumb: React.ComponentType<{ size?: Size; children?: React.ReactNode }>;
  BreadcrumbItem: React.ComponentType<{ children?: React.ReactNode }>;
  BreadcrumbDivider: React.ComponentType<{}>;
  BreadcrumbButton: React.ComponentType<{
    current?: boolean;
    disabled?: boolean;
    disabledFocusable?: boolean;
    href?: string;
    icon?: React.ReactElement;
    'aria-label'?: string;
    children?: React.ReactNode;
  }>;
  Icon: React.ComponentType;
};

const windmod: Family = {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Icon: CalendarMonth,
};

const griffel: Family = {
  Breadcrumb: GriffelBreadcrumb,
  BreadcrumbItem: GriffelBreadcrumbItem,
  BreadcrumbDivider: GriffelBreadcrumbDivider,
  BreadcrumbButton: GriffelBreadcrumbButton,
  Icon: GriffelCalendarMonth,
};

const sizes: Size[] = ['small', 'medium', 'large'];

const Trail = ({ family, size }: { family: Family; size?: Size }): React.ReactNode => {
  const { Breadcrumb: Root, BreadcrumbItem: Item, BreadcrumbDivider: Divider, BreadcrumbButton: Button } = family;

  return (
    <Root size={size}>
      <Item>
        <Button>Home</Button>
      </Item>
      <Divider />
      <Item>
        <Button icon={<family.Icon />}>Documents</Button>
      </Item>
      <Divider />
      <Item>
        <Button current>{size ?? 'current'}</Button>
      </Item>
    </Root>
  );
};

const States = ({ family }: { family: Family }): React.ReactNode => {
  const { Breadcrumb: Root, BreadcrumbItem: Item, BreadcrumbDivider: Divider, BreadcrumbButton: Button } = family;

  return (
    <Root>
      <Item>
        <Button href="#home">Link</Button>
      </Item>
      <Divider />
      <Item>
        <Button disabled>Disabled</Button>
      </Item>
      <Divider />
      <Item>
        <Button disabledFocusable>Focusable</Button>
      </Item>
      <Divider />
      <Item>Plain</Item>
    </Root>
  );
};

export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.grid}>
    <span className={styles.header} />
    <span className={styles.header}>Windmod</span>
    <span className={styles.header}>Griffel</span>

    {sizes.map(size => (
      <React.Fragment key={size}>
        <span className={styles.label}>{size}</span>
        <FluentProvider>
          <Trail family={windmod} size={size} />
        </FluentProvider>
        <GriffelFluentProvider theme={webLightTheme}>
          <Trail family={griffel} size={size} />
        </GriffelFluentProvider>
      </React.Fragment>
    ))}

    <span className={styles.label}>states</span>
    <FluentProvider>
      <States family={windmod} />
    </FluentProvider>
    <GriffelFluentProvider theme={webLightTheme}>
      <States family={griffel} />
    </GriffelFluentProvider>
  </div>
);
