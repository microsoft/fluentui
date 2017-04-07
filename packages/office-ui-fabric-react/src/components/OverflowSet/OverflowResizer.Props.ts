import * as React from 'react';
import { IOverflowSetProps } from './OverflowSet.Props';

export interface IOverflowResizerProps extends React.HTMLProps<HTMLElement> {
  items?: any[];
  onOverflow?: (items: any[]) => { items: any[], overflow: any[] };
  overflowSetProps?: IOverflowSetProps;
}
