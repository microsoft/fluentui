import * as React from 'react';
import {
  GroupedList
} from './GroupedList';
import {
  IListProps
} from '../List';

import {
  IDragDropContext,
  IDragDropEvents,
  IDragDropHelper
} from '../../utilities/dragdrop/index';
import {
  ISelection,
  SelectionMode
} from '../../utilities/selection/index';
import { IViewport } from '../../utilities/decorators/withViewport';

export interface IGroupedList {
  /**
   * Ensures that the list content is updated. Call this in cases where the list prop updates don't change, but the list
   * still needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change, you can
   * call this to force a re-evaluation. Be aware that this can be an expensive operation and should be done sparingly.
   */
  forceUpdate: () => void;
}

export interface IGroupedListProps extends React.Props<GroupedList> {
  /** Optional class name to add to the root element. */
  className?: string;

  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** helper to manage drag/drop across item and groups */
  dragDropHelper?: IDragDropHelper;

  /** Event names and corresponding callbacks that will be registered to groups and rendered elements */
  eventsToRegister?: [{ eventName: string, callback: (context: IDragDropContext, event?: any) => void }];

  /** Optional override properties to render groups. */
  groupProps?: IGroupRenderProps;

  /** Optional grouping instructions. */
  groups?: IGroup[];

  /** List of items to render. */
  items: any[];

  /** Optional properties to pass through to the list components being rendered. */
  listProps?: IListProps;

  /** Rendering callback to render the group items. */
  onRenderCell: (
    nestingDepth?: number,
    item?: any,
    index?: number
    ) => React.ReactNode;

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the list manages selection. */
  selectionMode?: SelectionMode;

  /** Optional Viewport, provided by the parent component. */
  viewport?: IViewport;
}

export interface IGroup {
  /**
   * Unique identifier for the group.
   */
  key: string;

  /**
   * Display name for the group, rendered on the header.
   */
  name: string;

  /**
   * Start index for the group within the given items.
   */
  startIndex: number;

  /**
   * How many items should be rendered within the group.
   */
  count: number;

  /**
   * Nested groups, if any.
   */
  children?: IGroup[];

  /**
   * Number indicating the level of nested groups.
   */
  level?: number;

  /**
   * If all the items in the group are selected.
   */
  isSelected?: boolean;

  /**
   * If all the items in the group are collapsed.
   */
  isCollapsed?: boolean;

  /**
   * If the items within the group are summarized or showing all.
   */
  isShowingAll?: boolean;

  /**
   * If drag/drop is enabled for the group header.
   */
  isDropEnabled?: boolean;

  /**
   * Arbitrary data required to be preserved by the caller.
   */
  data?: any;

  /**
   * Override which allows the caller to provide a custom header.
   */
  onRenderHeader?: (group: IGroup) => React.ReactNode;

  /**
   * Override which allows the caller to provider a customer footer.
   */
  onRenderFooter?: (group: IGroup) => React.ReactNode;
}

export interface IGroupRenderProps {
  /** Boolean indicating if all groups are in collapsed state. */
  isAllGroupsCollapsed?: boolean;

  /** Grouping item limit. */
  getGroupItemLimit?: (group: IGroup) => number;

  /** Callback for when all groups are expanded or collapsed. */
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;

  /** Information to pass in to the group header. */
  headerProps?: IGroupHeaderProps;

  /** Information to pass in to the group footer. */
  footerProps?: IGroupFooterProps;
}

export interface IGroupHeaderProps {
  /** Callback to determine if a group has missing items and needs to load them from the server. */
  isGroupLoading?: (group: IGroup) => boolean;

  /** Text shown on group headers to indicate the group is being loaded. */
  loadingText?: string;

  /** Callback for when the group header is clicked. */
  onGroupHeaderClick?: (group: IGroup) => void;

  /** Callback for when the group is expanded or collapsed. */
  onToggleCollapse?: (group: IGroup) => void;

  /** Callback for when the group is selected. */
  onToggleSelectGroup?: (group: IGroup) => void;

  /** Determines if the group selection check box is shown for collapsed groups. */
  preventSelectCollapsedGroups?: boolean;
}

export interface IGroupFooterProps {
  /** Callback for when the "Show All" link in group footer is clicked */
  onToggleSummarize?: (group: IGroup) => void;

  /** Text to display for the group footer show all link. */
  showAllLinkText?: string;
}

