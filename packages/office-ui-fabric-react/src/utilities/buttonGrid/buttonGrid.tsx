import * as React from 'react';
import { styled } from '../../Utilities';
import { ButtonGridBase } from './buttonGrid.base';
import { IButtonGridProps, IButtonGridStyleProps, IButtonGridStyles } from './buttonGrid.types';
import { getStyles } from './buttonGrid.styles';

export const buttonGrid: React.FunctionComponent<IButtonGridProps> = styled<
  IButtonGridProps,
  IButtonGridStyleProps,
  IButtonGridStyles
>(ButtonGridBase, getStyles);

/**
 * @deprecated - use buttonGrid instead
 */
export const Grid = buttonGrid;
