import * as React from 'react';
import {
  IStyleFunction,
  styled
} from '../../Styling';
import {
  ToggleBase
} from './Toggle.base';
import {
  IToggleProps,
  IToggleStyleProps,
  IToggleStyles
} from './Toggle.types';
import {
  getStyles
} from './Toggle.styles';

export const Toggle = styled(
  ToggleBase,
  getStyles
);
