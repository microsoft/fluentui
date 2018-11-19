import { styled } from '../../Utilities';
import { GridBase } from './Grid.base';
import { IGridProps, IGridStyleProps, IGridStyles } from './Grid.types';
import { getStyles } from './Grid.styles';

export const Grid: (props: IGridProps) => JSX.Element = styled<IGridProps, IGridStyleProps, IGridStyles>(GridBase, getStyles);
