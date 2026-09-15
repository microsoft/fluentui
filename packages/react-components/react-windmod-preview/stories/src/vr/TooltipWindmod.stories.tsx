import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tooltip } from '@fluentui/react-windmod-preview/tooltip';

import { TooltipVrScene } from './TooltipVrScene';

const pin = (text: string) => ({ children: text, popover: 'manual' });

export const TooltipWindmod = (): React.ReactNode => (
  <FluentProvider>
    <TooltipVrScene Tooltip={Tooltip as never} Button={Button} pin={pin} />
  </FluentProvider>
);
