import * as React from 'react';
import { Button, FluentProvider, Tooltip } from '@fluentui/react-windmod-preview';

import { TooltipVrScene } from './TooltipVrScene';

const pin = (text: string) => ({ children: text, popover: 'manual' });

export const TooltipWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TooltipVrScene Tooltip={Tooltip as never} Button={Button} pin={pin} />
  </FluentProvider>
);
