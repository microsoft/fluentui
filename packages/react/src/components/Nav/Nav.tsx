import * as React from 'react';
import { styled } from '../../Utilities';
import { INavProps, INavStyleProps, INavStyles } from './Nav.types';
import { NavBase } from './Nav.base';
import { getStyles } from './Nav.styles';

export const Nav: React.FunctionComponent<INavProps> = styled<INavProps, INavStyleProps, INavStyles>(
  NavBase,
  getStyles,
  undefined,
  {
    scope: 'Nav',
  },
);
