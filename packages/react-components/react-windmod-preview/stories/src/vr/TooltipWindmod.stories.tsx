import * as React from 'react';
import { Button, ThemeProvider, Tooltip } from '@fluentui/react-windmod-preview';

import { TooltipVrScene } from './TooltipVrScene';

const pin = (text: string) => ({ children: text, popover: 'manual' });

export const TooltipWindmod = (): React.ReactNode => (
  <ThemeProvider>
    <TooltipVrScene Tooltip={Tooltip as never} Button={Button} pin={pin} />
  </ThemeProvider>
);
