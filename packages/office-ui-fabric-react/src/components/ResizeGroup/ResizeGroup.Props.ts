import * as React from 'react';
import { ResizeGroup } from './ResizeGroup';


export interface IResizeGroup {

}

export interface IResizeGroupProps extends React.HTMLProps<ResizeGroup | HTMLElement> {
  data?: any;
  onRenderData?: (data: any) => JSX.Element;
  onReduceData?: (prevData: any) => any;
  componentRef?: (component: IResizeGroup) => void;
}
