import * as React from 'react';
import { OverflowSet } from './OverflowSet';
import { IContextualMenuItem } from '../../ContextualMenu';
import { IIconProps } from '../../Icon';

export interface IOverflowSetProps extends React.Props<OverflowSet> {

  /**
   * An array of items to be rendered by your onRenderItem function in the primary content area
  */
  items?: any[];

  /**
   * An array of items to be passed to overflow contextual menu
  */
  overflowItems?: IContextualMenuItem[];

  /**
   * Icon props used to override overflow icon.
  */
  iconProps?: IIconProps;

  /**
   * Method to call when trying to render an item.
   * If item contains an onRender, that function will be used instead.
  */
  onRenderItem?: (item?: any, index?: number) => React.ReactNode;
}