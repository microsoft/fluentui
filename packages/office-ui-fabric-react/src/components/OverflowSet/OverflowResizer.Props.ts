import * as React from 'react';
import { IOverflowSetProps } from './OverflowSet.Props';

export interface IOverflowResizerProps extends React.HTMLProps<HTMLElement> {
  items?: any[];
  onOverflow?: any;
  overflowSetProps?: IOverflowSetProps;
}
