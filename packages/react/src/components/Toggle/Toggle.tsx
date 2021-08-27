import * as React from 'react';
import { styled } from '@fluentui/utilities';
import { ToggleBase } from './Toggle.base';
import { getStyles } from './Toggle.styles';
import type { IToggleProps, IToggleStyleProps, IToggleStyles } from './Toggle.types';

export const Toggle: React.FunctionComponent<IToggleProps> = styled<IToggleProps, IToggleStyleProps, IToggleStyles>(
  ToggleBase,
  getStyles,
  undefined,
  {
    scope: 'Toggle',
  },
);
