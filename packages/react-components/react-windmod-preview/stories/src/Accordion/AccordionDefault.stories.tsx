import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  FluentProvider,
} from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

// Bundled pair: the icon slot swaps regular → filled via data-fui-icon-variant.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const sizes = ['small', 'medium', 'large', 'extra-large'] as const;
const positions = ['start', 'end'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <Accordion key={size} collapsible defaultOpenItems={size}>
            <AccordionItem value={size}>
              <AccordionHeader size={size}>{size}</AccordionHeader>
              <AccordionPanel>Panel body</AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      <div className={styles.row}>
        {positions.map(position => (
          <Accordion key={position} collapsible>
            <AccordionItem value={position}>
              <AccordionHeader expandIconPosition={position}>chevron {position}</AccordionHeader>
              <AccordionPanel>Panel body</AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      <div className={styles.row}>
        <Accordion collapsible>
          <AccordionItem value="icon">
            <AccordionHeader icon={<CalendarMonth />}>with an icon</AccordionHeader>
            <AccordionPanel>Panel body</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      <div className={styles.row}>
        <Accordion>
          <AccordionItem value="disabled" disabled>
            <AccordionHeader>disabled</AccordionHeader>
            <AccordionPanel>Panel body</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      <div className={styles.row}>
        <Accordion collapsible>
          <AccordionItem value="inline">
            <AccordionHeader inline>inline</AccordionHeader>
            <AccordionPanel>Panel body</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      <Accordion multiple collapsible defaultOpenItems={['two']}>
        {['one', 'two', 'three'].map(value => (
          <AccordionItem key={value} value={value}>
            <AccordionHeader>section {value}</AccordionHeader>
            <AccordionPanel>body {value}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </FluentProvider>
);
