import * as React from 'react';
import {
  styled
} from '../../Utilities';
import { GridBase } from './Grid.base';
import { IGridProps } from './Grid.types';
import { getStyles } from './Grid.styles';

export const Grid = styled(
  GridBase,
  getStyles
);