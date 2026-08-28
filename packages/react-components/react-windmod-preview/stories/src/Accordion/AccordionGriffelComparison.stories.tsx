import * as React from 'react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-windmod-preview/accordion';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  Accordion as GriffelAccordion,
  AccordionHeader as GriffelAccordionHeader,
  AccordionItem as GriffelAccordionItem,
  AccordionPanel as GriffelAccordionPanel,
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

// Each side uses its own atoms and bundler: headless (data-fui-icon-variant) vs Griffel classic.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const GriffelCalendarMonth = griffelBundleIcon(GriffelCalendarMonthFilled, GriffelCalendarMonthRegular);

type Size = 'small' | 'medium' | 'large' | 'extra-large';

type Family = {
  Accordion: React.ElementType;
  AccordionItem: React.ElementType;
  AccordionHeader: React.ElementType;
  AccordionPanel: React.ElementType;
  Icon: React.ComponentType;
};

const windmod: Family = { Accordion, AccordionItem, AccordionHeader, AccordionPanel, Icon: CalendarMonth };
const griffel: Family = {
  Accordion: GriffelAccordion,
  AccordionItem: GriffelAccordionItem,
  AccordionHeader: GriffelAccordionHeader,
  AccordionPanel: GriffelAccordionPanel,
  Icon: GriffelCalendarMonth,
};

const rows: { label: string; render: (family: Family) => React.ReactNode }[] = [
  ...(['small', 'medium', 'large', 'extra-large'] as Size[]).map(size => ({
    label: size,
    render: ({ Accordion: A, AccordionItem: I, AccordionHeader: H, AccordionPanel: P }: Family) => (
      <A collapsible defaultOpenItems={size}>
        <I value={size}>
          <H size={size}>{size}</H>
          <P>Panel body</P>
        </I>
      </A>
    ),
  })),
  {
    label: 'chevron end',
    render: ({ Accordion: A, AccordionItem: I, AccordionHeader: H, AccordionPanel: P }) => (
      <A collapsible>
        <I value="end">
          <H expandIconPosition="end">chevron end</H>
          <P>Panel body</P>
        </I>
      </A>
    ),
  },
  {
    label: 'icon',
    render: ({ Accordion: A, AccordionItem: I, AccordionHeader: H, AccordionPanel: P, Icon }) => (
      <A collapsible defaultOpenItems="icon">
        <I value="icon">
          <H icon={<Icon />}>with an icon</H>
          <P>Panel body</P>
        </I>
      </A>
    ),
  },
  {
    label: 'disabled',
    render: ({ Accordion: A, AccordionItem: I, AccordionHeader: H, AccordionPanel: P }) => (
      <A>
        <I value="disabled" disabled>
          <H>disabled</H>
          <P>Panel body</P>
        </I>
      </A>
    ),
  },
  {
    label: 'inline',
    render: ({ Accordion: A, AccordionItem: I, AccordionHeader: H, AccordionPanel: P }) => (
      <A collapsible>
        <I value="inline">
          <H inline>inline</H>
          <P>Panel body</P>
        </I>
      </A>
    ),
  },
];

export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.grid}>
    <span />
    <span className={styles.header}>windmod</span>
    <span className={styles.header}>griffel</span>

    {rows.map(({ label, render }) => (
      <React.Fragment key={label}>
        <span className={styles.label}>{label}</span>
        <FluentProvider>{render(windmod)}</FluentProvider>
        <GriffelFluentProvider theme={webLightTheme}>{render(griffel)}</GriffelFluentProvider>
      </React.Fragment>
    ))}
  </div>
);
