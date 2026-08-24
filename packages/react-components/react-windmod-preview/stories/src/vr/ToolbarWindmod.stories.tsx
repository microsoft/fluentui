import * as React from 'react';
import {
  FluentProvider,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarRadioButton,
  ToolbarRadioGroup,
  ToolbarToggleButton,
} from '@fluentui/react-windmod-preview';
import { CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons/headless/svg/calendar-month';
import { bundleIcon } from '@fluentui/react-icons/headless';

import { ToolbarVrScene } from './ToolbarVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const ToolbarWindmod = (): React.ReactNode => (
  <FluentProvider>
    <ToolbarVrScene
      Toolbar={Toolbar}
      ToolbarButton={ToolbarButton}
      ToolbarToggleButton={ToolbarToggleButton}
      ToolbarRadioButton={ToolbarRadioButton}
      ToolbarDivider={ToolbarDivider}
      ToolbarGroup={ToolbarGroup}
      ToolbarRadioGroup={ToolbarRadioGroup}
      Icon={CalendarMonth}
    />
  </FluentProvider>
);
