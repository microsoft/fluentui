import * as React from 'react';
import {
  GroupedList
} from './GroupedList';
import {
  IListProps
} from '../../List';
import { IRenderFunction } from '../../common/IRenderFunction';
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

  /**
   * Toggles the collapsed state of all the groups in the list.
   */
  toggleCollapseAll: (allCollapsed: boolean) => void;
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

  /** Optional callback when the group expand state changes between all collapsed and at least one group is expanded. */
  onGroupExpandStateChanged?: (isSomeGroupExpanded: boolean) => void;
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
   * @deprecated
   * This is no longer supported. Selection state will be controled by the selection store only. Will be removed in 1.0.0.
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
   * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
   * If none is specified, the arai-label attribute will contain the group name
   */
  ariaLabel?: string;
}

export interface IGroupRenderProps {
  /** Boolean indicating if all groups are in collapsed state. */
  isAllGroupsCollapsed?: boolean;

  /** Grouping item limit. */
  getGroupItemLimit?: (group: IGroup) => number;

  /** Callback for when all groups are expanded or collapsed. */
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;

  /** Information to pass in to the group header. */
  headerProps?: IGroupDividerProps;

  /** Information to pass in to the group footer. */
  footerProps?: IGroupDividerProps;

  /**
   * Override which allows the caller to provide a custom header.
   */
  onRenderHeader?: IRenderFunction<IGroupDividerProps>;

  /**
   * Override which allows the caller to provider a customer footer.
   */
  onRenderFooter?: IRenderFunction<IGroupDividerProps>;
}

export interface IGroupDividerProps {
  /** Callback to determine if a group has missing items and needs to load them from the server. */
  isGroupLoading?: (group: IGroup) => boolean;

  /** Text shown on group headers to indicate the group is being loaded. */
  loadingText?: string;

  /** The group to be rendered by the header. */
  group?: IGroup;

  /** The index of the group. */
  groupIndex?: number;

  /** The indent level of the group. */
  groupLevel?: number;

  /** If all items in the group are selected. */
  isSelected?: boolean;

  /** A reference to the viewport in which the header is rendered. */
  viewport?: IViewport;

  /** The selection mode of the list the group lives within. */
  selectionMode?: SelectionMode;

  /** Text to display for the group footer show all link. */
  showAllLinkText?: string;

  /** Callback for when the "Show All" link in group footer is clicked */
  onToggleSummarize?: (group: IGroup) => void;

  /** Callback for when the group header is clicked. */
  onGroupHeaderClick?: (group: IGroup) => void;

  /** Callback for when the group is expanded or collapsed. */
  onToggleCollapse?: (group: IGroup) => void;

  /** Callback for when the group is selected. */
  onToggleSelectGroup?: (group: IGroup) => void;

  /** Determines if the group selection check box is shown for collapsed groups. */
  isCollapsedGroupSelectVisible?: boolean;
}
