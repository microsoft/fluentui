import * as React from 'react';
import { ResizeGroup } from './ResizeGroup';

export interface IResizeGroupProps extends React.HTMLProps<ResizeGroup | HTMLElement> {

  /**
   * Data to be passed to the onRenderData function
  */
  data?: any;

  /**
   * Function to render the data
  */
  onRenderData: (data: any) => JSX.Element;

  /**
   * Function to be performed on the data in order to make it fit into the given space
  */
  onReduceData: (prevData: any) => any;
}
