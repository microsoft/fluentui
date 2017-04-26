import * as React from 'react';
import { OverflowSet } from './OverflowSet';
import { IContextualMenuItem } from '../../ContextualMenu';
import { IRenderFunction } from '../../Utilities';

export interface IOverflowSetProps extends React.Props<OverflowSet> {

  /**
   * An array of items to be rendered by your onRenderItem function in the primary content area
  */
  items: any[];

  /**
   * An array of items to be passed to overflow contextual menu
  */
  overflowItems?: IContextualMenuItem[];

  /**
   * Method to call when trying to render an item.
   * If item contains an onRender, that function will be used instead.
  */
  onRenderItem: IRenderFunction<any>;

  /**
   * Rendering method for overflow button and contextual menu.
  */
  onRenderOverflowButton: IRenderFunction<IContextualMenuItem[]>;
}
