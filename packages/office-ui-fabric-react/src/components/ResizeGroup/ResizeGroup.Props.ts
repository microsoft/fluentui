import * as React from 'react';
import { ResizeGroup } from './ResizeGroup';

export interface IResizeGroup {

}

export interface IResizeGroupProps extends React.HTMLProps<ResizeGroup | HTMLElement> {

  /**
   * Optional callback to access the IResizeGroup interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IResizeGroup) => void;

  /**
   * Data to be passed to the onRenderData function
  */
  data?: any;

  /**
   * Function to render the data
  */
  onRenderData: (data: any) => JSX.Element;

  /**
   * Function to be performed on the data in order to make it fit into the given space.
   * If there are no more scaling steps to apply, it should return undefined to prevent
   * an infinite render loop.
  */
  onReduceData: (prevData: any) => any;
}
