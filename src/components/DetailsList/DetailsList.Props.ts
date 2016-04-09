import * as React from 'react';
import DetailsList from './DetailsList';
import {
  IGroup,
  DetailsListLayoutMode,
  ConstrainMode,
  IColumn,
  IDragDropEvents
} from './interfaces';
import {
  ISelection,
  SelectionMode
} from '../../utilities/selection/interfaces';
import { IViewport } from '../../utilities/decorators/withViewport';

export interface IDetailsListProps extends React.Props<DetailsList> {
  /** A key that uniquely identifies the given items. If provided, the selection will be reset when the key changes. */
  setKey?: string;

  /** The items to render. */
  items: any[];

  /** Optional class name to add to the root element. */
  className?: string;

  /** Optional grouping instructions. */
  groups?: IGroup[];

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the details list manages selection. */
  selectionMode?: SelectionMode;

  /** Controls how the columns are adjusted. */
  layoutMode?: DetailsListLayoutMode;

  /** Given column defitions. If none are provided, default columns will be created based on the item's properties. */
  columns?: IColumn[];

  /** Controls how the list contrains overflow. */
  constrainMode?: ConstrainMode;

  /** Grouping item limit. */
  groupItemLimit?: number;

  /** Event names and corresponding callbacks that will be registered to rendered row elements. */
  rowElementEventMap?: [{ eventName: string, callback: (item?: any, index?: number, event?: any) => void }];

  /** Callback for when the details list has been updated. Useful for telemetry tracking externally. */
  onDidUpdate?: (detailsList?: DetailsList) => any;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page. */
  onRowDidMount?: (item?: any, index?: number) => void;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been removed from the page. */
  onRowWillUnmount?: (item?: any, index?: number) => void;

  /** Callback for when a given row has been invoked (by pressing enter while it is selected.) */
  onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;

  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

    /** Callback for what to render when the item is missing. */
  onRenderMissingItem?: (index?: number) => React.ReactNode;

  /** Viewport, provided by the withViewport decorator. */
  viewport?: IViewport;
}

export interface IDetailsListViewData {
  columns: IColumn[];
  layoutMode: DetailsListLayoutMode;
  rowCheckWidth: number;
}
