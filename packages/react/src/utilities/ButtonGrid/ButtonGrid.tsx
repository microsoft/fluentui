import * as React from 'react';
import { styled } from '../../Utilities';
import { ButtonGridBase } from './ButtonGrid.base';
import { getStyles } from './ButtonGrid.styles';
import type { IButtonGridProps, IButtonGridStyleProps, IButtonGridStyles } from './ButtonGrid.types';

export const ButtonGrid: React.FunctionComponent<IButtonGridProps> = styled<
  IButtonGridProps,
  IButtonGridStyleProps,
  IButtonGridStyles,
  HTMLElement
>(ButtonGridBase, getStyles);
ButtonGrid.displayName = 'ButtonGrid';
