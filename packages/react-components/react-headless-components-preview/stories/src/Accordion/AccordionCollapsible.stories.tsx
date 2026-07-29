import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@fluentui/react-headless-components-preview/accordion';
import { ChevronRightRegular } from '@fluentui/react-icons';

import styles from './accordion.module.css';
const items = [
  { value: 'item-1', header: 'Section one', panel: 'All items can be collapsed.' },
  { value: 'item-2', header: 'Section two', panel: 'Click an open item to close it.' },
  { value: 'item-3', header: 'Section three', panel: 'Only one item open at a time.' },
];

export const Collapsible = (): React.ReactNode => (
  <Accordion className={`${styles.accordion} ${styles.demo}`} collapsible>
    {items.map(item => (
      <AccordionItem className={styles.item} key={item.value} value={item.value}>
        <AccordionHeader
          className={styles.header}
          button={{ className: styles.headerBtn }}
          expandIcon={<ChevronRightRegular className={styles.expandIcon} aria-hidden />}
        >
          <span className={styles.label}>{item.header}</span>
        </AccordionHeader>
        <AccordionPanel className={styles.panel}>{item.panel}</AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);
