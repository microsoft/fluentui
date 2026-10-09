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
  webLightTheme,
} from '@fluentui/react-components';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';

import { ToolbarVrScene } from './ToolbarVrScene';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const ToolbarGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
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
