import * as React from 'react';
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-windmod-preview/accordion';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { AccordionVrScene } from './AccordionVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const AccordionWindmod = (): React.ReactNode => (
  <FluentProvider>
    <AccordionVrScene
      Accordion={Accordion}
      AccordionItem={AccordionItem}
      AccordionHeader={AccordionHeader}
      AccordionPanel={AccordionPanel}
      Icon={CalendarMonth}
    />
  </FluentProvider>
);
