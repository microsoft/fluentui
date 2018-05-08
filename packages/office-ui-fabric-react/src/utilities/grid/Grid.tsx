import {
  styled
} from '../../Utilities';
import { GridBase } from './Grid.base';
import { IGridProps } from './Grid.types';
import { getStyles } from './Grid.styles';

export const Grid: (props: IGridProps) => JSX.Element = styled(
  GridBase,
  getStyles
);