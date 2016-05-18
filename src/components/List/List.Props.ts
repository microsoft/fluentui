import * as React from 'react';
import { ISelection } from '../../utilities/selection/interfaces';
import List from './List';

export interface IListProps extends React.Props<List> {
  /** Optional classname to append to root list. */
  className?: string;

  /** Items to render. */
  items?: any[];

  /** Method to call when trying to render an item. */
  onRenderCell?: (item?: any, index?: number) => React.ReactNode;

  /** Method to call to get how many items to render per page from specified index. */
  getItemCountForPage?: (itemIndex?: number, surfaceRect?: ClientRect) => number;

  /** How many items to render per page. */
  itemsPerPage?: number;

  /** Index in items array to start rendering from. Defaults to 0. */
  startIndex?: number;

  /** Number of items to render. Defaults to items.length. */
  renderCount?: number;

  /** Optional selection model to track selection state.  */
  selection?: ISelection;
}
