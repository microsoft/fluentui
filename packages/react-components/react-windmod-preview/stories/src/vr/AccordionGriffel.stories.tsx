import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  FluentProvider,
  webLightTheme,
} from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { AccordionVrScene } from './AccordionVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const AccordionGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <AccordionVrScene
      Accordion={Accordion}
      AccordionItem={AccordionItem}
      AccordionHeader={AccordionHeader}
      AccordionPanel={AccordionPanel}
      Icon={CalendarMonth}
    />
  </FluentProvider>
);
