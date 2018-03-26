import {
  styled
} from '../../Utilities';
import { GridBase } from './Grid.base';
// tslint:disable-next-line:no-unused-variable
import { IGridProps } from './Grid.types';
import { getStyles } from './Grid.styles';

export const Grid = styled(
  GridBase,
  getStyles
);