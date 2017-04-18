import * as React from 'react';
import { IOverFlowItemState } from './ResizeGroup';

export interface IResizeGroupProps extends React.HTMLProps<HTMLElement> {
  items?: any[];
  onRenderItems?: (items: any[]) => JSX.Element;
  onReduceItems?: (prevItems: IOverFlowItemState, props: IResizeGroupProps) => IOverFlowItemState;
}
