import * as React from 'react';
import { styled } from '@uifabric/utilities';
import { ToggleBase } from './Toggle.base';
import { getStyles } from './Toggle.styles';
import { IToggleProps, IToggleStyleProps, IToggleStyles } from './Toggle.types';

export const Toggle = styled<IToggleProps & React.RefAttributes<HTMLDivElement>, IToggleStyleProps, IToggleStyles>(
  ToggleBase,
  getStyles,
  undefined,
  {
    scope: 'Toggle',
  },
);
