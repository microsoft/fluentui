import * as React from 'react';
import { Button, FluentProvider, Tooltip, webLightTheme } from '@fluentui/react-components';

import { TooltipVrScene } from './TooltipVrScene';

const pin = (text: string) => text;

export const TooltipGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <TooltipVrScene Tooltip={Tooltip as never} Button={Button} pin={pin} />
  </FluentProvider>
);
