import * as React from 'react';
import { styled } from '../../Utilities';
import { ButtonGridBase } from './ButtonGrid.base';
import { IButtonGridProps, IButtonGridStyleProps, IButtonGridStyles } from './ButtonGrid.types';
import { getStyles } from './ButtonGrid.styles';

export const ButtonGrid: React.FunctionComponent<IButtonGridProps> = styled<
  IButtonGridProps,
  IButtonGridStyleProps,
  IButtonGridStyles,
  HTMLElement
>(ButtonGridBase, getStyles);
ButtonGrid.displayName = 'ButtonGrid';
