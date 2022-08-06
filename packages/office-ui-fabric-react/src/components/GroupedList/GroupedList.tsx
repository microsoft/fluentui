import * as React from 'react';
import {
  BaseComponent,
  IRectangle,
  assign,
  css,
  createRef
} from '../../Utilities';
import {
  IGroupedList,
  IGroupedListProps,
  IGroup
} from './GroupedList.types';
import {
  GroupedListSection
} from './GroupedListSection';
import {
  List,
  ScrollToMode
} from '../../List';
import {
  SelectionMode
} from '../../utilities/selection/index';
import * as stylesImport from './GroupedList.scss';
const styles: any = stylesImport;

export interface IGroupedListState {
  lastWidth?: number;
  lastSelectionMode?: SelectionMode;
  groups?: IGroup[];
}

export class GroupedList extends BaseComponent<IGroupedListProps, IGroupedListState> implements IGroupedList {
  public static defaultProps = {
    selectionMode: SelectionMode.multiple,
    isHeaderVisible: true,
    groupProps: {}
  };

  public refs: {
    [key: string]: React.ReactInstance,
  };

  private _list = createRef<List>();

  private _isSomeGroupExpanded: boolean;

  constructor(props: IGroupedListProps) {
    super(props);

    this._isSomeGroupExpanded = this._computeIsSomeGroupExpanded(props.groups);

    this.state = {
      lastWidth: 0,
      groups: props.groups
    };
  }

  public scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void {
    if (this._list.current) {
      this._list.current.scrollToIndex(index, measureItem, scrollToMode);
    }
  }

  public componentWillReceiveProps(newProps: IGroupedListProps): void {
    const {
      groups,
      selectionMode
    } = this.props;
    let shouldForceUpdates = false;

    if (newProps.groups !== groups) {
      this.setState({ groups: newProps.groups });
      shouldForceUpdates = true;
    }

    if (newProps.selectionMode !== selectionMode) {
      shouldForceUpdates = true;
    }

    if (shouldForceUpdates) {
      this._forceListUpdates();
    }
  }

  public render(): JSX.Element {
    const {
      className,
      usePageCache,
      onShouldVirtualize
    } = this.props;
    const {
      groups
    } = this.state;

    return (
      <div
        className={ css('ms-GroupedList', styles.root, className) }
        data-automationid='GroupedList'
        data-is-scrollable='false'
        role='presentation'
      >
        { !groups ?
          this._renderGroup(null, 0) : (
            <List
              ref={ this._list }
              role='presentation'
              items={ groups }
              onRenderCell={ this._renderGroup }
              getItemCountForPage={ this._returnOne }
              getPageSpecification={ this._getPageSpecification }
              usePageCache={ usePageCache }
              onShouldVirtualize={ onShouldVirtualize }
            />
          )
        }
      </div>
    );
  }

  public forceUpdate() {
    super.forceUpdate();
    this._forceListUpdates();
  }

  public toggleCollapseAll(allCollapsed: boolean): void {
    const { groups } = this.state;
    const { groupProps } = this.props;
    const onToggleCollapseAll = groupProps && groupProps.onToggleCollapseAll;

    if (groups) {
      if (onToggleCollapseAll) {
        onToggleCollapseAll(allCollapsed);
      }

      for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
        groups[groupIndex].isCollapsed = allCollapsed;
      }

      this._updateIsSomeGroupExpanded();

      this.forceUpdate();
    }
  }

  private _renderGroup = (group: any, groupIndex: number): JSX.Element | null => {
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
      groups
    } = this.props;

    // override group header/footer props as needed
    const dividerProps = {
      onToggleSelectGroup: this._onToggleSelectGroup,
      onToggleCollapse: this._onToggleCollapse,
      onToggleSummarize: this._onToggleSummarize
    };

    const headerProps = assign({}, groupProps!.headerProps, dividerProps);
    const showAllProps = assign({}, groupProps!.showAllProps, dividerProps);
    const footerProps = assign({}, groupProps!.footerProps, dividerProps);
    const groupNestingDepth = this._getGroupNestingDepth();

    if (!groupProps!.showEmptyGroups && group && group.count === 0) {
      return null;
    }

    return (
      <GroupedListSection
        ref={ 'group_' + groupIndex }
        key={ this._getGroupKey(group, groupIndex) }
        dragDropEvents={ dragDropEvents }
        dragDropHelper={ dragDropHelper }
        eventsToRegister={ eventsToRegister }
        footerProps={ footerProps }
        getGroupItemLimit={ groupProps && groupProps.getGroupItemLimit }
        group={ group }
        groupIndex={ groupIndex }
        groupNestingDepth={ groupNestingDepth }
        headerProps={ headerProps }
        listProps={ listProps }
        items={ items }
        onRenderCell={ onRenderCell }
        onRenderGroupHeader={ groupProps!.onRenderHeader }
        onRenderGroupShowAll={ groupProps!.onRenderShowAll }
        onRenderGroupFooter={ groupProps!.onRenderFooter }
        selectionMode={ selectionMode }
        selection={ selection }
        showAllProps={ showAllProps }
        viewport={ viewport }
        onShouldVirtualize={ onShouldVirtualize }
        groups={ groups }
      />
    );
  }

  private _returnOne(): number {
    return 1;
  }

  private _getGroupKey(group: IGroup, index: number): string {
    return 'group-' + ((group && group.key) ? group.key : String(index));
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
  }

  private _onToggleSelectGroup = (group: IGroup): void => {
    if (group) {
      this.props.selection!.toggleRangeSelected(group.startIndex, group.count);
    }
  }

  private _forceListUpdates(groups?: IGroup[]): void {
    groups = groups || this.state.groups;

    const groupCount = groups ? groups.length : 1;

    if (this._list.current) {
      this._list.current.forceUpdate();

      for (let i = 0; i < groupCount; i++) {
        const group = this._list.current.refs['group_' + String(i)] as GroupedListSection;
        if (group) {
          group.forceListUpdate();
        }
      }
    } else {
      const group = this.refs['group_' + String(0)] as GroupedListSection;
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
  }

  private _getPageSpecification = (itemIndex: number, visibleRect: IRectangle): {
    key?: string;
  } => {
    const groups = this.state.groups;
    const pageGroup = groups && groups[itemIndex];
    return {
      key: pageGroup && pageGroup.name
    };
  }

  private _computeIsSomeGroupExpanded(groups: IGroup[] | undefined): boolean {
    return !!(groups && groups.some(group => group.children ? this._computeIsSomeGroupExpanded(group.children) : !group.isCollapsed));
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
