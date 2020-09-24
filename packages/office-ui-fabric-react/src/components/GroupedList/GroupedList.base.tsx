import * as React from 'react';
import { IProcessedStyleSet } from '../../Styling';
import {
  IGroupedList,
  IGroupedListProps,
  IGroup,
  IGroupedListStyleProps,
  IGroupedListStyles,
} from './GroupedList.types';
import { initializeComponentRef, classNamesFunction, KeyCodes, getRTLSafeKeyCode, css } from '../../Utilities';
import { GroupedListSection } from './GroupedListSection';
import { List, ScrollToMode, IListProps } from '../../List';
import { SelectionMode } from '../../utilities/selection/index';
import { DEFAULT_ROW_HEIGHTS } from '../DetailsList/DetailsRow.styles';
import { IGroupHeaderProps } from './GroupHeader';
import { IGroupShowAllProps } from './GroupShowAll.styles';
import { IGroupFooterProps } from './GroupFooter.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';

const getClassNames = classNamesFunction<IGroupedListStyleProps, IGroupedListStyles>();
const { rowHeight: ROW_HEIGHT, compactRowHeight: COMPACT_ROW_HEIGHT } = DEFAULT_ROW_HEIGHTS;

export interface IGroupedListState {
  lastSelectionMode?: SelectionMode;
  groups?: IGroup[];
  version: {};
}

export class GroupedListBase extends React.Component<IGroupedListProps, IGroupedListState> implements IGroupedList {
  public static defaultProps = {
    selectionMode: SelectionMode.multiple,
    isHeaderVisible: true,
    groupProps: {},
    compact: false,
  };

  private _classNames: IProcessedStyleSet<IGroupedListStyles>;

  private _list = React.createRef<List>();

  private _isSomeGroupExpanded: boolean;

  private _groupRefs: Record<string, GroupedListSection | null> = {};

  public static getDerivedStateFromProps(
    nextProps: IGroupedListProps,
    previousState: IGroupedListState,
  ): IGroupedListState {
    let nextState = previousState;

    const { listProps: { version = undefined } = {} } = nextProps;

    if (version) {
      nextState = {
        ...nextState,
        version,
      };
    }

    const { groups, selectionMode, compact } = nextProps;
    let shouldForceUpdates = false;

    if (nextProps.groups !== groups) {
      nextState = {
        ...nextState,
        groups: nextProps.groups,
      };
    }

    if (nextProps.selectionMode !== selectionMode || nextProps.compact !== compact) {
      shouldForceUpdates = true;
    }

    if (shouldForceUpdates) {
      nextState = {
        ...nextState,
        version: {},
      };
    }

    return nextState;
  }

  constructor(props: IGroupedListProps) {
    super(props);

    initializeComponentRef(this);

    this._isSomeGroupExpanded = this._computeIsSomeGroupExpanded(props.groups);

    const { listProps: { version = {} } = {} } = props;

    this.state = {
      groups: props.groups,
      version,
    };
  }

  public scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void {
    if (this._list.current) {
      this._list.current.scrollToIndex(index, measureItem, scrollToMode);
    }
  }

  public getStartItemIndexInView(): number {
    return this._list.current!.getStartItemIndexInView() || 0;
  }

  public componentDidMount() {
    const { groupProps, groups = [] } = this.props;

    if (groupProps && groupProps.isAllGroupsCollapsed) {
      this._setGroupsCollapsedState(groups, groupProps.isAllGroupsCollapsed);
    }
  }

  public render(): JSX.Element {
    const { className, usePageCache, onShouldVirtualize, theme, styles, compact, focusZoneProps = {} } = this.props;
    const { groups, version } = this.state;
    this._classNames = getClassNames(styles, {
      theme: theme!,
      className,
      compact: compact,
    });

    const { shouldEnterInnerZone = this._isInnerZoneKeystroke } = focusZoneProps;

    return (
      <FocusZone
        direction={FocusZoneDirection.vertical}
        data-automationid="GroupedList"
        data-is-scrollable="false"
        role="presentation"
        {...focusZoneProps}
        shouldEnterInnerZone={shouldEnterInnerZone}
        className={css(this._classNames.root, focusZoneProps.className)}
      >
        {!groups ? (
          this._renderGroup(undefined, 0)
        ) : (
          <List
            ref={this._list}
            role="presentation"
            items={groups}
            onRenderCell={this._renderGroup}
            getItemCountForPage={this._returnOne}
            getPageHeight={this._getPageHeight}
            getPageSpecification={this._getPageSpecification}
            usePageCache={usePageCache}
            onShouldVirtualize={onShouldVirtualize}
            version={version}
          />
        )}
      </FocusZone>
    );
  }

  public forceUpdate() {
    super.forceUpdate();
    this._forceListUpdates();
  }

  public toggleCollapseAll(allCollapsed: boolean): void {
    const { groups = [] } = this.state;
    const { groupProps } = this.props;
    const onToggleCollapseAll = groupProps && groupProps.onToggleCollapseAll;

    if (groups.length > 0) {
      if (onToggleCollapseAll) {
        onToggleCollapseAll(allCollapsed);
      }

      this._setGroupsCollapsedState(groups, allCollapsed);

      this._updateIsSomeGroupExpanded();

      this.forceUpdate();
    }
  }

  private _setGroupsCollapsedState(groups: IGroup[], isCollapsed: boolean): void {
    for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
      groups[groupIndex].isCollapsed = isCollapsed;
    }
  }

  private _renderGroup = (group: IGroup | undefined, groupIndex: number): React.ReactNode => {
    const {
      dragDropEvents,
      dragDropHelper,
      eventsToRegister,
      groupProps,
      items,
      listProps,
      onRenderCell,
      selectionMode,
      selection,
      viewport,
      onShouldVirtualize,
      groups,
      compact,
    } = this.props;

    // override group header/footer props as needed
    const dividerProps = {
      onToggleSelectGroup: this._onToggleSelectGroup,
      onToggleCollapse: this._onToggleCollapse,
      onToggleSummarize: this._onToggleSummarize,
    };

    const headerProps: IGroupHeaderProps = { ...groupProps!.headerProps, ...dividerProps };
    const showAllProps: IGroupShowAllProps = { ...groupProps!.showAllProps, ...dividerProps };
    const footerProps: IGroupFooterProps = { ...groupProps!.footerProps, ...dividerProps };
    const groupNestingDepth = this._getGroupNestingDepth();

    if (!groupProps!.showEmptyGroups && group && group.count === 0) {
      return null;
    }

    const finalListProps: IListProps = {
      ...(listProps || {}),
      version: this.state.version,
    };

    return (
      <GroupedListSection
        ref={ref => (this._groupRefs['group_' + groupIndex] = ref)}
        key={this._getGroupKey(group, groupIndex)}
        dragDropEvents={dragDropEvents}
        dragDropHelper={dragDropHelper}
        eventsToRegister={eventsToRegister}
        footerProps={footerProps}
        getGroupItemLimit={groupProps && groupProps.getGroupItemLimit}
        group={group}
        groupIndex={groupIndex}
        groupNestingDepth={groupNestingDepth}
        groupProps={groupProps}
        headerProps={headerProps}
        listProps={finalListProps}
        items={items}
        onRenderCell={onRenderCell}
        onRenderGroupHeader={groupProps!.onRenderHeader}
        onRenderGroupShowAll={groupProps!.onRenderShowAll}
        onRenderGroupFooter={groupProps!.onRenderFooter}
        selectionMode={selectionMode}
        selection={selection}
        showAllProps={showAllProps}
        viewport={viewport}
        onShouldVirtualize={onShouldVirtualize}
        groupedListClassNames={this._classNames}
        groups={groups}
        compact={compact}
      />
    );
  };

  private _returnOne(): number {
    return 1;
  }

  private _getDefaultGroupItemLimit = (group: IGroup): number => {
    return group.count;
  };

  private _getGroupItemLimit = (group: IGroup): number => {
    const { groupProps } = this.props;
    const getGroupItemLimit =
      groupProps && groupProps.getGroupItemLimit ? groupProps.getGroupItemLimit : this._getDefaultGroupItemLimit;

    return getGroupItemLimit(group);
  };

  private _getGroupHeight = (group: IGroup): number => {
    const rowHeight = this.props.compact ? COMPACT_ROW_HEIGHT : ROW_HEIGHT;

    return rowHeight + (group.isCollapsed ? 0 : rowHeight * this._getGroupItemLimit(group));
  };

  private _getPageHeight: IListProps['getPageHeight'] = (itemIndex: number) => {
    const { groups } = this.state;
    const { getGroupHeight = this._getGroupHeight } = this.props;
    const pageGroup = groups && groups[itemIndex];

    if (pageGroup) {
      return getGroupHeight(pageGroup, itemIndex);
    } else {
      return 0;
    }
  };

  private _getGroupKey(group: IGroup | undefined, index: number): string {
    return 'group-' + (group && group.key ? group.key : String(index));
  }

  private _getGroupNestingDepth(): number {
    const { groups } = this.state;
    let level = 0;
    let groupsInLevel = groups;

    while (groupsInLevel && groupsInLevel.length > 0) {
      level++;
      groupsInLevel = groupsInLevel[0].children;
    }

    return level;
  }

  private _onToggleCollapse = (group: IGroup): void => {
    const { groupProps } = this.props;
    const onToggleCollapse = groupProps && groupProps.headerProps && groupProps.headerProps.onToggleCollapse;

    if (group) {
      if (onToggleCollapse) {
        onToggleCollapse(group);
      }

      group.isCollapsed = !group.isCollapsed;
      this._updateIsSomeGroupExpanded();
      this.forceUpdate();
    }
  };

  private _onToggleSelectGroup = (group: IGroup): void => {
    const { selection, selectionMode } = this.props;

    if (group && selection && selectionMode === SelectionMode.multiple) {
      selection.toggleRangeSelected(group.startIndex, group.count);
    }
  };

  private _isInnerZoneKeystroke = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    return ev.which === getRTLSafeKeyCode(KeyCodes.right);
  };

  private _forceListUpdates(groups?: IGroup[]): void {
    groups = groups || this.state.groups;

    const groupCount = groups ? groups.length : 1;

    if (this._list.current) {
      this._list.current.forceUpdate();

      for (let i = 0; i < groupCount; i++) {
        const group = this._list.current.pageRefs['group_' + String(i)] as GroupedListSection;
        if (group) {
          group.forceListUpdate();
        }
      }
    } else {
      const group = this._groupRefs['group_' + String(0)];
      if (group) {
        group.forceListUpdate();
      }
    }
  }

  private _onToggleSummarize = (group: IGroup): void => {
    const { groupProps } = this.props;
    const onToggleSummarize = groupProps && groupProps.showAllProps && groupProps.showAllProps.onToggleSummarize;

    if (onToggleSummarize) {
      onToggleSummarize(group);
    } else {
      if (group) {
        group.isShowingAll = !group.isShowingAll;
      }

      this.forceUpdate();
    }
  };

  private _getPageSpecification = (
    itemIndex: number,
  ): {
    key?: string;
  } => {
    const groups = this.state.groups;
    const pageGroup = groups && groups[itemIndex];
    return {
      key: pageGroup && pageGroup.key,
    };
  };

  private _computeIsSomeGroupExpanded(groups: IGroup[] | undefined): boolean {
    return !!(
      groups &&
      groups.some(group => (group.children ? this._computeIsSomeGroupExpanded(group.children) : !group.isCollapsed))
    );
  }

  private _updateIsSomeGroupExpanded(): void {
    const { groups } = this.state;
    const { onGroupExpandStateChanged } = this.props;

    const newIsSomeGroupExpanded = this._computeIsSomeGroupExpanded(groups);
    if (this._isSomeGroupExpanded !== newIsSomeGroupExpanded) {
      if (onGroupExpandStateChanged) {
        onGroupExpandStateChanged(newIsSomeGroupExpanded);
      }
      this._isSomeGroupExpanded = newIsSomeGroupExpanded;
    }
  }
}
