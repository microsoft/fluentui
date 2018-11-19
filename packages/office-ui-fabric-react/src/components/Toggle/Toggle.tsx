import * as React from 'react';
import { styled } from '../../Utilities';
import { ToggleBase } from './Toggle.base';
import { getStyles } from './Toggle.styles';
import { IToggleProps, IToggleStyleProps, IToggleStyles } from './Toggle.types';

export const Toggle: React.StatelessComponent<IToggleProps> = styled<IToggleProps, IToggleStyleProps, IToggleStyles>(
  ToggleBase,
  getStyles,
  undefined,
  { scope: 'Toggle' }
);
