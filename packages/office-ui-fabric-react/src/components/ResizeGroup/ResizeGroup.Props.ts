import * as React from 'react';

export interface IResizeGroupProps extends React.HTMLProps<HTMLElement> {
  data?: any;
  onRenderData?: (data: any) => JSX.Element;
  onReduceData?: (prevData: any) => any;
}
