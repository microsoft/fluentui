import * as React from 'react';
import { GroupedListBase } from './GroupedList.base';
import { IList, IListProps } from '../../List';
import { IRefObject, IRenderFunction } from '../../Utilities';
import { IDragDropContext, IDragDropEvents, IDragDropHelper } from '../../utilities/dragdrop/index';
import { ISelection, SelectionMode } from '../../utilities/selection/index';
import { IViewport } from '../../utilities/decorators/withViewport';
import { ITheme, IStyle } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';
import { IGroupHeaderProps } from './GroupHeader.types';
import { IGroupShowAllProps } from './GroupShowAll.types';
import { IGroupFooterProps } from './GroupFooter.types';

export enum CollapseAllVisibility {
  hidden = 0,
  visible = 1
}

export interface IGroupedList extends IList {
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

export interface IGroupedListProps extends React.ClassAttributes<GroupedListBase> {
  /**
   * Theme that is passed in from Higher Order Component
   */
  theme?: ITheme;

  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<IGroupedListStyleProps, IGroupedListStyles>;

  /**
   * Optional callback to access the IGroupedList interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IGroupedList>;

  /** Optional class name to add to the root element. */
  className?: string;

  /** Boolean value to indicate if the component should render in compact mode. Set to false by default */
  compact?: boolean;

  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** helper to manage drag/drop across item and groups */
  dragDropHelper?: IDragDropHelper;

  /** Event names and corresponding callbacks that will be registered to groups and rendered elements */
  eventsToRegister?: { eventName: string; callback: (context: IDragDropContext, event?: any) => void }[];

  /** Optional override properties to render groups. */
  groupProps?: IGroupRenderProps;

  /** Optional grouping instructions. */
  groups?: IGroup[];

  /** List of items to render. */
  items: any[];

  /** Optional properties to pass through to the list components being rendered. */
  listProps?: IListProps;

  /** Rendering callback to render the group items. */
  onRenderCell: (nestingDepth?: number, item?: any, index?: number) => React.ReactNode;

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the list manages selection. */
  selectionMode?: SelectionMode;

  /** Optional Viewport, provided by the parent component. */
  viewport?: IViewport;

  /** Optional callback when the group expand state changes between all collapsed and at least one group is expanded. */
  onGroupExpandStateChanged?: (isSomeGroupExpanded: boolean) => void;

  /**
   * boolean to control if pages containing unchanged items should be cached, this is a perf optimization
   * The same property in List.Props
   */
  usePageCache?: boolean;

  /**
   * Optional callback to determine whether the list should be rendered in full, or virtualized.
   * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
   * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for smaller lists.
   * The default implementation will virtualize when this callback is not provided.
   */
  onShouldVirtualize?: (props: IListProps) => boolean;

  /**
   * Optional function which will be called to estimate the height (in pixels) of the given group.
   *
   * By default, scrolling through a large virtualized GroupedList will often "jump" due to the order
   * in which heights are calculated. For more details, see https://github.com/OfficeDev/office-ui-fabric-react/issues/5094
   *
   * Pass this prop to ensure the list uses the computed height rather than cached DOM measurements,
   * avoiding the scroll jumping issue.
   */
  getGroupHeight?: (group: IGroup, groupIndex: number) => number;
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
   * Deprecated at 1.0.0, selection state will be controled by the selection store only.
   * @deprecated At 1.0.0, selection state wil be controlled by the selection store only.
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

  /**
   * Optional flag to indicate the group has more data to load than the current group count indicated.
   * This can be used to indicate that a plus should be rendered next to the group count in the header.
   */
  hasMoreData?: boolean;
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

  /** Information to pass in to the group Show all footer. */
  showAllProps?: IGroupShowAllProps;

  /** Information to pass in to the group footer. */
  footerProps?: IGroupFooterProps;

  /**
   * Override which allows the caller to provide a custom header.
   */
  onRenderHeader?: IRenderFunction<IGroupHeaderProps>;

  /**
   * Override which allows the caller to provide a custom Show All link.
   */
  onRenderShowAll?: IRenderFunction<IGroupShowAllProps>;

  /**
   * Override which allows the caller to provide a custom footer.
   */
  onRenderFooter?: IRenderFunction<IGroupFooterProps>;

  /**
   * Flag to indicate whether to ignore the collapsing icon on header.
   * @defaultvalue CheckboxVisibility.visible
   */
  collapseAllVisibility?: CollapseAllVisibility;

  /**
   * Boolean indicating if empty groups are shown
   * @defaultvalue false
   */
  showEmptyGroups?: boolean;
}

export interface IGroupDividerProps {
  componentRef?: IRefObject<{}>;

  /** Boolean value to indicate if the component should render in compact mode. Set to false by default */
  compact?: boolean;

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

  /** Width corresponding to a single level. This is multiplied by the groupLevel to get the full spacer width for the group. */
  indentWidth?: number;

  /** If all items in the group are selected. */
  selected?: boolean;

  /**
   * Deprecated at v.65.1 and will be removed by v 1.0. Use `selected` instead.
   * @deprecated Use `selected` instead.
   */
  isSelected?: boolean;

  /** A reference to the viewport in which the header is rendered. */
  viewport?: IViewport;

  /** The selection mode of the list the group lives within. */
  selectionMode?: SelectionMode;

  /** Text to display for the group footer. */
  footerText?: string;

  /** Text to display for the group "Show All" link. */
  showAllLinkText?: string;

  /** Callback for when the group "Show All" link is clicked */
  onToggleSummarize?: (group: IGroup) => void;

  /** Callback for when the group header is clicked. */
  onGroupHeaderClick?: (group: IGroup) => void;

  /** Callback for when the group is expanded or collapsed. */
  onToggleCollapse?: (group: IGroup) => void;

  /** Callback for when the group is selected. */
  onToggleSelectGroup?: (group: IGroup) => void;

  /** Determines if the group selection check box is shown for collapsed groups. */
  isCollapsedGroupSelectVisible?: boolean;

  /** Override which allows the caller to provider a custom renderer for the GroupHeader title. */
  onRenderTitle?: IRenderFunction<IGroupHeaderProps>;

  /** Props for expand/collapse button */
  expandButtonProps?: React.HTMLAttributes<HTMLButtonElement>;

  /** Stores parent group's children. */
  groups?: IGroup[];

  /** Custom className */
  className?: string;

  /** Theme provided by the Higher Order Component */
  theme?: ITheme;
}

export type IGroupedListStyleProps = Required<Pick<IGroupedListProps, 'theme'>> &
  Pick<IGroupedListProps, 'className'> & {
    /** whether or not the group is collapsed */
    isCollapsed?: boolean;

    /** Whether the group is in compact mode or not */
    compact?: boolean;
  };

export interface IGroupedListStyles {
  root: IStyle;
  group: IStyle;
  groupIsDropping: IStyle;
}
