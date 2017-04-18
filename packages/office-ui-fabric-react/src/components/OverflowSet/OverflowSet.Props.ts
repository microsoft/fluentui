import * as React from 'react';
import { OverflowSet } from './OverflowSet';
import { IContextualMenuItem } from '../../ContextualMenu';
import { IIconProps } from '../../Icon';

export interface IOverflowSetProps extends React.Props<OverflowSet> {
  items?: any[];
  overflowItems?: IContextualMenuItem[];
  iconProps?: IIconProps;

  /**
   * Method to call when trying to render an item.
   * If item contains an onRender, that function will be used instead.
  */
  onRenderItem?: (item?: any, index?: number) => React.ReactNode;
}
