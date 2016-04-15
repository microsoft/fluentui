import * as React from 'react';
import { ISelection } from '../../utilities/selection/interfaces';
import List from './List';

export interface IListProps extends React.Props<List> {
  /** Items to render. */
  items?: any[];

  /** Method to call when trying to render an item. */
  onRenderCell?: (item?: any, index?: number) => React.ReactNode;

  /** Method to call to get how many items to render per page from specified index. */
  getItemCountForPage?: (itemIndex?: number, surfaceRect?: ClientRect) => number;

  /** How many items to render per page. */
  itemsPerPage?: number;

  selection?: ISelection;
}
