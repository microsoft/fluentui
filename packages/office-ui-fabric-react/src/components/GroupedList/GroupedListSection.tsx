import * as React from 'react';
import { IGroup, IGroupDividerProps, IGroupRenderProps, IGroupedListStyles } from './GroupedList.types';
import { IGroupHeaderProps } from './GroupHeader.types';
import { IGroupFooterProps } from './GroupFooter.types';
import { IGroupShowAllProps } from './GroupShowAll.types';

import { IDragDropContext, IDragDropEvents, IDragDropHelper } from '../../utilities/dragdrop/index';

import { BaseComponent, IRenderFunction, IDisposable, IClassNames } from '../../Utilities';

import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/index';

import { GroupHeader } from './GroupHeader';
import { GroupShowAll } from './GroupShowAll';
import { GroupFooter } from './GroupFooter';

import { List } from '../../List';
import { IDragDropOptions } from './../../utilities/dragdrop/interfaces';
import { assign, css, getId } from '../../Utilities';
import { IViewport } from '../../utilities/decorators/withViewport';
import { IListProps } from '../List/index';

export interface IGroupedListSectionProps extends React.ClassAttributes<GroupedListSection> {
  /** GroupedList resolved class names */
  groupedListClassNames?: IClassNames<IGroupedListStyles>;

  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /** Whether to render in compact mode */
  compact?: boolean;

  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** helper to manage drag/drop across item rows and groups */
  dragDropHelper?: IDragDropHelper;

  /** Event names and corresponding callbacks that will be registered to the group and the rendered elements */
  eventsToRegister?: { eventName: string; callback: (context: IDragDropContext, event?: any) => void }[];

  /** Information to pass in to the group footer. */
  footerProps?: IGroupFooterProps;

  /** Grouping item limit. */
  getGroupItemLimit?: (group: IGroup) => number;

  /** Optional grouping instructions. */
  groupIndex?: number;

  /** Optional group nesting level. */
  groupNestingDepth?: number;

  /** Optional grouping instructions. */
  group?: IGroup;

  /** Optional override properties to render groups. */
  groupProps?: IGroupRenderProps;

  /** Information to pass in to the group header. */
  headerProps?: IGroupHeaderProps;

  /** List of items to render. */
  items: any[];

  /** Optional list props to pass to list renderer.  */
  listProps?: IListProps;

  /** Rendering callback to render the group items. */
  onRenderCell: (nestingDepth?: number, item?: any, index?: number) => React.ReactNode;

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the details list manages selection. */
  selectionMode?: SelectionMode;

  /** Information to pass in to the group Show All footer. */
  showAllProps?: IGroupShowAllProps;

  /** Optional Viewport, provided by the parent component. */
  viewport?: IViewport;

  /** Override for rendering the group header. */
  onRenderGroupHeader?: IRenderFunction<IGroupHeaderProps>;

  /** Override for rendering the group Show All link. */
  onRenderGroupShowAll?: IRenderFunction<IGroupShowAllProps>;

  /** Override for rendering the group footer. */
  onRenderGroupFooter?: IRenderFunction<IGroupFooterProps>;

  /**
   * Optional callback to determine whether the list should be rendered in full, or virtualized.
   * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
   * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for smaller lists.
   * The default implementation will virtualize when this callback is not provided.
   */
  onShouldVirtualize?: (props: IListProps) => boolean;

  /** Stores parent group's children. */
  groups?: IGroup[];
}

export interface IGroupedListSectionState {
  isDropping?: boolean;
  isSelected?: boolean;
}

const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';

export class GroupedListSection extends BaseComponent<IGroupedListSectionProps, IGroupedListSectionState> {
  private _root = React.createRef<HTMLDivElement>();
  private _list = React.createRef<List>();
  private _id: string;

  private _dragDropSubscription: IDisposable;

  constructor(props: IGroupedListSectionProps) {
    super(props);

    const { selection, group } = props;

    this._id = getId('GroupedListSection');

    this.state = {
      isDropping: false,
      isSelected: selection && group ? selection.isRangeSelected(group.startIndex, group.count) : false
    };
  }

  public componentDidMount(): void {
    const { dragDropHelper, selection } = this.props;

    if (dragDropHelper && this._root.current) {
      this._dragDropSubscription = dragDropHelper.subscribe(this._root.current, this._events, this._getGroupDragDropOptions());
    }

    if (selection) {
      this._events.on(selection, SELECTION_CHANGE, this._onSelectionChange);
    }
  }

  public componentWillUnmount() {
    if (this._dragDropSubscription) {
      this._dragDropSubscription.dispose();
    }
  }

  public componentDidUpdate(previousProps: IGroupedListSectionProps) {
    if (
      this.props.group !== previousProps.group ||
      this.props.groupIndex !== previousProps.groupIndex ||
      this.props.dragDropHelper !== previousProps.dragDropHelper
    ) {
      if (this._dragDropSubscription) {
        this._dragDropSubscription.dispose();
        delete this._dragDropSubscription;
      }

      if (this.props.dragDropHelper && this._root.current) {
        this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root.current, this._events, this._getGroupDragDropOptions());
      }
    }
  }

  public render(): JSX.Element {
    const {
      getGroupItemLimit,
      group,
      groupIndex,
      headerProps,
      showAllProps,
      footerProps,
      viewport,
      selectionMode,
      onRenderGroupHeader = this._onRenderGroupHeader,
      onRenderGroupShowAll = this._onRenderGroupShowAll,
      onRenderGroupFooter = this._onRenderGroupFooter,
      onShouldVirtualize,
      groupedListClassNames,
      groups,
      compact
    } = this.props;
    const { isSelected } = this.state;
    const renderCount = group && getGroupItemLimit ? getGroupItemLimit(group) : Infinity;
    const isShowAllVisible =
      group && !group.children && !group.isCollapsed && !group.isShowingAll && (group.count > renderCount || group.hasMoreData);
    const hasNestedGroups = group && group.children && group.children.length > 0;

    const dividerProps: IGroupDividerProps = {
      group,
      groupIndex,
      groupLevel: group ? group.level : 0,
      isSelected,
      viewport,
      selectionMode,
      groups,
      compact
    };

    const ariaControlsProps: IGroupHeaderProps = {
      groupedListId: this._id
    };

    const groupHeaderProps: IGroupHeaderProps = assign({}, headerProps, dividerProps, ariaControlsProps);
    const groupShowAllProps: IGroupShowAllProps = assign({}, showAllProps, dividerProps);
    const groupFooterProps: IGroupFooterProps = assign({}, footerProps, dividerProps);

    return (
      <div
        ref={this._root}
        className={css(groupedListClassNames && groupedListClassNames.group, this._getDroppingClassName())}
        role="presentation"
      >
        {onRenderGroupHeader(groupHeaderProps, this._onRenderGroupHeader)}
        {group && group.isCollapsed ? null : hasNestedGroups ? (
          <List
            role="presentation"
            ref={this._list}
            items={group!.children}
            onRenderCell={this._renderSubGroup}
            getItemCountForPage={this._returnOne}
            onShouldVirtualize={onShouldVirtualize}
            id={this._id}
          />
        ) : (
          this._onRenderGroup(renderCount)
        )}
        {group && group.isCollapsed ? null : isShowAllVisible && onRenderGroupShowAll(groupShowAllProps, this._onRenderGroupShowAll)}
        {onRenderGroupFooter(groupFooterProps, this._onRenderGroupFooter)}
      </div>
    );
  }

  public forceUpdate() {
    super.forceUpdate();
    this.forceListUpdate();
  }

  public forceListUpdate() {
    const { group } = this.props;

    if (this._list.current) {
      this._list.current.forceUpdate();

      if (group && group.children && group.children.length > 0) {
        const subGroupCount = group.children.length;

        for (let i = 0; i < subGroupCount; i++) {
          const subGroup = this._list.current.refs['subGroup_' + String(i)] as GroupedListSection;

          if (subGroup) {
            subGroup.forceListUpdate();
          }
        }
      }
    } else {
      const subGroup = this.refs['subGroup_' + String(0)] as GroupedListSection;

      if (subGroup) {
        subGroup.forceListUpdate();
      }
    }
  }

  private _onRenderGroupHeader = (props: IGroupHeaderProps): JSX.Element => {
    return <GroupHeader {...props} />;
  };

  private _onRenderGroupShowAll = (props: IGroupShowAllProps): JSX.Element => {
    return <GroupShowAll {...props} />;
  };

  private _onRenderGroupFooter = (props: IGroupFooterProps): JSX.Element => {
    return <GroupFooter {...props} />;
  };

  private _onSelectionChange(): void {
    const { group, selection } = this.props;
    const isSelected = selection!.isRangeSelected(group!.startIndex, group!.count);

    if (isSelected !== this.state.isSelected) {
      this.setState({ isSelected });
    }
  }

  private _onRenderGroupCell(
    onRenderCell: any,
    groupNestingDepth: number | undefined
  ): (item: any, itemIndex: number | undefined) => React.ReactNode {
    return (item: any, itemIndex: number | undefined): React.ReactNode => {
      return onRenderCell(groupNestingDepth, item, itemIndex);
    };
  }

  private _onRenderGroup(renderCount: number): JSX.Element {
    const { group, items, onRenderCell, listProps, groupNestingDepth, onShouldVirtualize } = this.props;
    const count = group ? group.count : items.length;
    const startIndex = group ? group.startIndex : 0;

    return (
      <List
        role="grid"
        items={items}
        onRenderCell={this._onRenderGroupCell(onRenderCell, groupNestingDepth)}
        ref={this._list}
        renderCount={Math.min(count, renderCount)}
        startIndex={startIndex}
        onShouldVirtualize={onShouldVirtualize}
        id={this._id}
        {...listProps}
      />
    );
  }

  private _renderSubGroup = (subGroup: IGroup, subGroupIndex: number): JSX.Element | null => {
    const {
      dragDropEvents,
      dragDropHelper,
      eventsToRegister,
      getGroupItemLimit,
      groupNestingDepth,
      groupProps,
      items,
      headerProps,
      showAllProps,
      footerProps,
      listProps,
      onRenderCell,
      selection,
      selectionMode,
      viewport,
      onRenderGroupHeader,
      onRenderGroupShowAll,
      onRenderGroupFooter,
      onShouldVirtualize,
      group,
      compact
    } = this.props;

    return !subGroup || subGroup.count > 0 || (groupProps && groupProps.showEmptyGroups) ? (
      <GroupedListSection
        ref={'subGroup_' + subGroupIndex}
        key={this._getGroupKey(subGroup, subGroupIndex)}
        dragDropEvents={dragDropEvents}
        dragDropHelper={dragDropHelper}
        eventsToRegister={eventsToRegister}
        footerProps={footerProps}
        getGroupItemLimit={getGroupItemLimit}
        group={subGroup}
        groupIndex={subGroupIndex}
        groupNestingDepth={groupNestingDepth}
        groupProps={groupProps}
        headerProps={headerProps}
        items={items}
        listProps={listProps}
        onRenderCell={onRenderCell}
        selection={selection}
        selectionMode={selectionMode}
        showAllProps={showAllProps}
        viewport={viewport}
        onRenderGroupHeader={onRenderGroupHeader}
        onRenderGroupShowAll={onRenderGroupShowAll}
        onRenderGroupFooter={onRenderGroupFooter}
        onShouldVirtualize={onShouldVirtualize}
        groups={group!.children}
        compact={compact}
      />
    ) : null;
  };

  private _returnOne(): number {
    return 1;
  }

  private _getGroupKey(group: IGroup, index: number): string {
    return 'group-' + (group && group.key ? group.key : String(group.level) + String(index));
  }

  /**
   * collect all the data we need to enable drag/drop for a group
   */
  private _getGroupDragDropOptions = (): IDragDropOptions => {
    const { group, groupIndex, dragDropEvents, eventsToRegister } = this.props;
    const options = {
      eventMap: eventsToRegister,
      selectionIndex: -1,
      context: { data: group, index: groupIndex, isGroup: true },
      canDrag: () => false, // cannot drag groups
      canDrop: dragDropEvents!.canDrop,
      updateDropState: this._updateDroppingState
    };
    return options as IDragDropOptions;
  };

  /**
   * update groupIsDropping state based on the input value, which is used to change style during drag and drop
   *
   * @private
   * @param {boolean} newValue (new isDropping state value)
   * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
   */
  private _updateDroppingState = (newIsDropping: boolean, event: DragEvent): void => {
    const { isDropping } = this.state;
    const { dragDropEvents } = this.props;

    if (!isDropping) {
      if (dragDropEvents && dragDropEvents.onDragLeave) {
        dragDropEvents.onDragLeave!(event, undefined);
      }
    } else {
      if (dragDropEvents && dragDropEvents.onDragEnter) {
        dragDropEvents.onDragEnter(event, undefined);
      }
    }

    if (isDropping !== newIsDropping) {
      this.setState({ isDropping: newIsDropping });
    }
  };

  /**
   * get the correct css class to reflect the dropping state for a given group
   *
   * If the group is the current drop target, return the default dropping class name
   * Otherwise, return '';
   *
   */
  private _getDroppingClassName(): string {
    let { isDropping } = this.state;
    const { group, groupedListClassNames } = this.props;

    isDropping = !!(group && isDropping);

    return css(isDropping && DEFAULT_DROPPING_CSS_CLASS, isDropping && groupedListClassNames && groupedListClassNames.groupIsDropping);
  }
}
