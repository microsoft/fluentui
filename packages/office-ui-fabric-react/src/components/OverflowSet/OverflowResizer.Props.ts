import * as React from 'react';
import { IOverflowResizerState } from './OverflowResizer';
import { IOverflowSetProps } from './OverflowSet.Props';

export interface IOverflowResizerProps extends React.HTMLProps<HTMLElement> {
  items?: any[];
  updatedOverflowState?: (prevState, props) => IOverflowResizerState;
  overflowSetProps?: IOverflowSetProps;
}
