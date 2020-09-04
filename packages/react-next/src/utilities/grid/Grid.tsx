import { styled } from '../../Utilities';
import { GridBase } from './Grid.base';
import { IGridProps, IGridStyleProps, IGridStyles } from './Grid.types';
import { getStyles } from './Grid.styles';

export const Grid = styled<IGridProps, IGridStyleProps, IGridStyles, HTMLElement>(GridBase, getStyles);
