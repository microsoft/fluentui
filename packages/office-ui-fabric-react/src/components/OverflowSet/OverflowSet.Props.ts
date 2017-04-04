import * as React from 'react';
import { IRenderFunction } from '../../Utilities';
import { IContextualMenuProps } from '../../ContextualMenu';

export interface IOverflowSetProps extends React.HTMLProps<HTMLElement> {
  items?: any[];
  overflowItems?: any[];

  /** Method to call when trying to render an item. */
  onRenderItem?: (item?: any, index?: number) => React.ReactNode;
  onRenderOverflow?: IRenderFunction<IContextualMenuProps>;
}
