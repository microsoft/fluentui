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
  {
    value: 'overview',
    header: 'Overview',
    panel: 'A short summary of what this section is about. The design system favours generous radii and quiet borders.',
  },
  {
    value: 'details',
    header: 'Details',
    panel: 'Deeper details rendered inside the panel. The reveal animation is driven by data-open.',
  },
  {
    value: 'extras',
    header: 'Extras',
    panel: 'Supporting content. The expand icon rotates 90° when the item opens.',
  },
];

export const Default = (): React.ReactNode => (
  <Accordion className={`${styles.accordion} ${styles.demo}`}>
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
