import * as React from 'react';
import { IVerticalDividerProps, IVerticalDividerStyles, IVerticalDividerPropsStyles } from './VerticalDivider.types';
import { getStyles } from './VerticalDivider.styles';
import { VerticalDividerBase } from './VerticalDivider.base';
import { styled } from '../../Utilities';

export const VerticalDivider: React.StatelessComponent<IVerticalDividerProps> = styled<
  IVerticalDividerProps,
  IVerticalDividerPropsStyles,
  IVerticalDividerStyles
>(VerticalDividerBase, getStyles, undefined, {
  scope: 'VerticalDivider'
});
