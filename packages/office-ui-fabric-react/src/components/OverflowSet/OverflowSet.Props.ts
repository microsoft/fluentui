import * as React from 'react';
import { IRenderFunction } from '../../Utilities';
import { IContextualMenuProps, IContextualMenuItem } from '../../ContextualMenu';

export interface IOverflowSetProps extends React.HTMLProps<HTMLElement> {
  items?: any[];
  overflowItems?: IContextualMenuItem[];
  overflowIcon?: string;

  /** Method to call when trying to render an item. */
  onRenderItem?: (item?: any, index?: number) => React.ReactNode;
}
