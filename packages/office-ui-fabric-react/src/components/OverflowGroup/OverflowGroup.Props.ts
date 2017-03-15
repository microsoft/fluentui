import * as React from 'react';

export interface IOverflowGroupProps extends React.HTMLProps<HTMLElement> {
  items?: any[];

  /** Method to call when trying to render an item. */
  onRenderItem?: (item?: any, index?: number) => React.ReactNode;
}