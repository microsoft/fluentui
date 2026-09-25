'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { teamsLightTheme, FluentProvider } from '@fluentui/react-components';

export const FluentWapper: ForwardRefComponent<React.ComponentProps<typeof FluentProvider>> = React.forwardRef(
  (props, ref) => <FluentProvider {...props} ref={ref} theme={teamsLightTheme} />,
);
FluentWapper.displayName = 'FluentWapper';
