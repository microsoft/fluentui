import * as React from 'react';
import { OverflowSet } from './OverflowSet';
import { IRenderFunction } from '../../Utilities';
import { IObjectWithKey } from '../../Selection';

export interface IOverflowSetProps extends React.Props<OverflowSet> {

  /**
   * An array of items to be rendered by your onRenderItem function in the primary content area
  */
  items?: any[] | IObjectWithKey[];

  /**
   * An array of items to be passed to overflow contextual menu
  */
  overflowItems?: any[];

  /**
   * Method to call when trying to render an item.
  */
  onRenderItem: IRenderFunction<any>;

  /**
   * Rendering method for overflow button and contextual menu. The argument to the function is
   * the overflowItems passed in as props to this function.
  */
  onRenderOverflowButton: IRenderFunction<any[]>;
}
