import * as React from 'react';
import { IRenderFunction } from '../../Utilities';
import { IContextualMenuProps } from '../../ContextualMenu';

export interface IOverflowSetProps extends React.HTMLProps<HTMLElement> {
  items?: any[];
  overflowItems?: any[];
  gutterWidth?: GutterWidth;

  /** Method to call when trying to render an item. */
  onRenderItem?: (item?: any, index?: number) => React.ReactNode;
  onRenderOverflow?: IRenderFunction<IContextualMenuProps>;
}

export enum GutterWidth {
  none = 0,
  extraSmall = 1,
  small = 2,
  medium = 3,
  large = 4,
  extraLarge = 5
}