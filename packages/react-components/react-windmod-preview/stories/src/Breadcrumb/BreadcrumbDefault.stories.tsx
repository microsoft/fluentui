import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
} from '@fluentui/react-windmod-preview/breadcrumb';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import styles from '../compare.module.css';

// Bundled pair: a hovered breadcrumb button swaps regular → filled via data-fui-icon-variant, and a
// current one swaps back.
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const sizes = ['small', 'medium', 'large'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      <div className={styles.row}>
        {sizes.map(size => (
          <Breadcrumb key={size} size={size}>
            <BreadcrumbItem>
              <BreadcrumbButton>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton>Documents</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton current>{size}</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        ))}
      </div>

      <div className={styles.row}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbButton icon={<CalendarMonth />}>Calendar</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton icon={<CalendarMonth />} aria-label="Calendar" />
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className={styles.row}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbButton href="#home">Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton disabled>Disabled</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton disabledFocusable>Disabled focusable</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton current disabled>
              Current
            </BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      <div className={styles.row}>
        <Breadcrumb>
          <BreadcrumbItem>Plain text</BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>entries</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  </FluentProvider>
);
