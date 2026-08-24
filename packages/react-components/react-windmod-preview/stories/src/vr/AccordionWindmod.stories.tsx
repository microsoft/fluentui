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
