import * as React from 'react';
import { getStyles } from './VerticalDivider.styles';
import { VerticalDividerBase } from './VerticalDivider.base';
import { styled } from '../../Utilities';
import type {
  IVerticalDividerProps,
  IVerticalDividerStyles,
  IVerticalDividerPropsStyles,
} from './VerticalDivider.types';

export const VerticalDivider: React.FunctionComponent<IVerticalDividerProps> = styled<
  IVerticalDividerProps,
  IVerticalDividerPropsStyles,
  IVerticalDividerStyles
>(VerticalDividerBase, getStyles, undefined, {
  scope: 'VerticalDivider',
});
