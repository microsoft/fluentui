import * as React from 'react';
import DetailsGroup from './DetailsGroup';
import {
  IGroup,
  IColumn
} from './index';
import {
  ISelection,
  SelectionMode
} from '../../utilities/selection/interfaces';
import {
  IDragDropEvents,
  IDragDropContext,
  IDragDropHelper
} from './../../utilities/dragdrop/interfaces';

export interface IDetailsGroupProps extends React.Props<DetailsGroup> {
  /** The items to render. */
  items: any[];

  /** Given column definitions */
  columns?: IColumn[];

  /** Optional grouping instructions. */
  group?: IGroup;

  /** Optional grouping instructions. */
  groupIndex?: number;

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the details list manages selection. */
  selectionMode?: SelectionMode;

  /** Grouping item limit. */
  getGroupItemLimit?: (group: IGroup) => number;

  /** Text to display for the group footer show all link. */
  showAllLinkText?: string;

  /** Event names and corresponding callbacks that will be registered to the group and the rendered row elements */
  eventsToRegister?: [{ eventName: string, callback: (context: IDragDropContext, event?: any) => void }];

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page. */
  onRowDidMount?: (item?: any, index?: number) => void;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been removed from the page. */
  onRowWillUnmount?: (item?: any, index?: number) => void;

  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** Callback for what to render when the item is missing. */
  onRenderMissingItem?: (index?: number) => React.ReactNode;

  /** helper to manage drag/drop across item rows and groups */
  dragDropHelper?: IDragDropHelper;

  onToggleCollapse?: (groupIndex: number) => void;

  onToggleSelectGroup?: (groupIndex: number) => void;

  /** Callback for when the "Show All" link in group footer is clicked */
  onToggleSummarize?: (groupIndex: number) => void;

  /** Callback to determine if a group has missing items and needs to load them from the server. */
  isGroupLoading?: (group: IGroup) => boolean;

  /** Text shown on group headers to indicate the group is being loaded. */
  loadingText?: string;
}