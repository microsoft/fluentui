import * as React from 'react';
import { styled } from '../../Utilities';
import { NavBase } from './Nav.base';
import { getStyles } from './Nav.styles';
import type { INavProps, INavStyleProps, INavStyles } from './Nav.types';

export const Nav: React.FunctionComponent<INavProps> = styled<INavProps, INavStyleProps, INavStyles>(
  NavBase,
  getStyles,
  undefined,
  {
    scope: 'Nav',
  },
);
