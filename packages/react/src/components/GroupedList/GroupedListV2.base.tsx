import * as React from 'react';
import {
  initializeComponentRef,
  classNamesFunction,
  KeyCodes,
  getRTLSafeKeyCode,
  css,
  getId,
  EventGroup,
} from '../../Utilities';
import { List, ScrollToMode, IListProps } from '../../List';
import { SelectionMode, SELECTION_CHANGE } from '../../Selection';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import type { IProcessedStyleSet } from '../../Styling';
import type {
  IGroupedList,
  IGroupedListProps,
  IGroup,
  IGroupRenderProps,
  IGroupedListStyleProps,
  IGroupedListStyles,
} from './GroupedList.types';
import { GroupHeader } from './GroupHeader';
import { GroupShowAll } from './GroupShowAll';
import { GroupFooter } from './GroupFooter';
import type { IGroupHeaderProps } from './GroupHeader';
import type { IGroupShowAllProps } from './GroupShowAll.styles';
import type { IGroupFooterProps } from './GroupFooter.types';
import { useMount, useUnmount } from '@fluentui/react-hooks';

export interface IGroupedListV2State {
  selectionMode?: IGroupedListProps['selectionMode'];
  compact?: IGroupedListProps['compact'];
  groups?: IGroup[];
  items?: IGroupedListProps['items'];
  listProps?: IGroupedListProps['listProps'];
  version: {};
  groupExpandedVersion: {};
}

export interface IGroupedListV2Props extends IGroupedListProps {
  listRef: React.Ref<List>;
  version: {};
  groupExpandedVersion: {};
}

type IITemGroupedItem = {
  type: 'item';
  group: IGroup;
  item: any;
  itemIndex: number;
};

type IShowAllGroupedItem = {
  type: 'showAll';
  group: IGroup;
};

type IFooterGroupedItem = {
  type: 'footer';
  group: IGroup;
};

type IHeaderGroupedItem = {
  type: 'header';
  group: IGroup;
  groupId: string;
};

type IGroupedItem = IITemGroupedItem | IShowAllGroupedItem | IFooterGroupedItem | IHeaderGroupedItem;

type FlattenItemsFn = (
  groups: IGroup[] | undefined,
  items: any[],
  memoItems: IGroupedItem[],
  groupProps: IGroupRenderProps,
) => IGroupedItem[];

const flattenItems: FlattenItemsFn = (groups, items, memoItems, groupProps) => {
  if (!groups) {
    return items;
  }

  if (memoItems.length < 1) {
    // Not the exact final size but gets us in the ballpark.
    // This helps avoid trashing memory when building
    // the flattened list.
    memoItems = new Array(items.length);
  }

  let index = 0;

  const stack: IGroup[] = [];
  let j = groups.length - 1;
  while (j >= 0) {
    stack.push(groups[j]);
    j--;
  }

  while (stack.length > 0) {
    let group = stack.pop()!;
    memoItems[index] = {
      group,
      groupId: getId('GroupedListSection'),
      type: 'header',
    };

    index++;

    while (group.isCollapsed !== true && group?.children && group.children.length > 0) {
      j = group.children.length - 1;
      while (j > 0) {
        stack.push(group.children[j]);
        j--;
      }
      group = group.children[0];
      memoItems[index] = {
        group,
        groupId: getId('GroupedListSection'),
        type: 'header',
      };
      index++;
    }

    if (group.isCollapsed !== true) {
      let itemIndex = group.startIndex;
      const renderCount = groupProps.getGroupItemLimit ? groupProps.getGroupItemLimit(group) : Infinity;
      const count = !group.isShowingAll ? group.count : items.length;
      const itemEnd = itemIndex + Math.min(count, renderCount);
      while (itemIndex < itemEnd) {
        memoItems[index] = {
          group,
          item: items[itemIndex],
          itemIndex, // track the index in `item` for later rendering/selection
          type: 'item',
        };
        itemIndex++;
        index++;
      }

      const isShowAllVisible =
        !group.children &&
        !group.isCollapsed &&
        !group.isShowingAll &&
        (group.count > renderCount || group.hasMoreData);

      if (isShowAllVisible) {
        memoItems[index] = {
          group,
          type: 'showAll',
        };
        index++;
      }
    }
    // Placeholder for a potential footer.
    // Whether or not a footer is displayed is resolved
    // by the footer render function so this is just a marker
    // for where a footer may go.
    memoItems[index] = {
      group,
      type: 'footer',
    };
    index++;
  }

  memoItems.length = index;

  // console.log('MEMO ITEMS', memoItems);

  return memoItems;
};

const computeIsSomeGroupExpanded = (groups: IGroup[] | undefined): boolean => {
  return !!(
    groups && groups.some(group => (group.children ? computeIsSomeGroupExpanded(group.children) : !group.isCollapsed))
  );
};

const setGroupsCollapsedState = (groups: IGroup[] | undefined, isCollapsed: boolean): void => {
  if (groups === undefined) {
    return;
  }
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    groups[groupIndex].isCollapsed = isCollapsed;
  }
};

const isInnerZoneKeystroke = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
  // eslint-disable-next-line deprecation/deprecation
  return ev.which === getRTLSafeKeyCode(KeyCodes.right);
};

const getClassNames = classNamesFunction<IGroupedListStyleProps, IGroupedListStyles>();

const getKey: IListProps['getKey'] = (item, _index) => {
  if (item.type === 'group' && item.group) {
    return item.group.key;
  } else if (item.type === 'item' && item.item) {
    return item.item.key;
  }

  return null;
};

const renderGroupHeader = (props: IGroupHeaderProps): JSX.Element => {
  return <GroupHeader {...props} />;
};

const renderGroupShowAll = (props: IGroupShowAllProps): JSX.Element => {
  return <GroupShowAll {...props} />;
};

const renderGroupFooter = (props: IGroupFooterProps): JSX.Element | null => {
  if (props.group && props.footerText) {
    return <GroupFooter {...props} />;
  }

  return null;
};

export const GroupedListV2FC: React.FC<IGroupedListV2Props> = props => {
  const {
    selection,
    selectionMode = SelectionMode.multiple,
    groupProps = {},
    compact = false,
    items = [],
    groups,
    onGroupExpandStateChanged,

    className,
    usePageCache,
    onShouldVirtualize,
    theme,
    role = 'treegrid',
    styles,
    focusZoneProps = {},
    rootListProps = {},
    onRenderCell,
    viewport,
    listRef,
    groupExpandedVersion,
  } = props;

  const {
    onRenderHeader = renderGroupHeader,
    onRenderFooter = renderGroupFooter,
    onRenderShowAll = renderGroupShowAll,
  } = groupProps;

  const classNames: IProcessedStyleSet<IGroupedListStyles> = getClassNames(styles, {
    theme: theme!,
    className,
    compact,
  });

  const events = React.useRef<EventGroup>();
  const flatList = React.useRef<IGroupedItem[]>([]);
  const isSomeGroupExpanded = React.useRef<boolean>(computeIsSomeGroupExpanded(groups));

  const [version, setVersion] = React.useState({});
  const [toggleVersion, setToggleVersion] = React.useState({});

  // eslint-disable-next-line deprecation/deprecation
  const { shouldEnterInnerZone = isInnerZoneKeystroke } = focusZoneProps;

  const listView = React.useMemo(() => {
    return flattenItems(groups, items, flatList.current, groupProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, groupProps, items, toggleVersion, flatList]);

  const getPageSpecification = React.useCallback(
    (flattenedIndex: number): { key?: string } => {
      const pageGroup = listView[flattenedIndex];
      return {
        key: pageGroup.type === 'group' ? pageGroup.group!.key : undefined,
      };
    },
    [listView],
  );

  useMount(() => {
    if (groupProps?.isAllGroupsCollapsed) {
      setGroupsCollapsedState(groups, groupProps.isAllGroupsCollapsed);
    }
    events.current = new EventGroup(this);
    if (selection) {
      events.current.on(selection, SELECTION_CHANGE, onSelectionChange);
    }
  });

  const onSelectionChange = React.useCallback(() => {
    setVersion({});
  }, [setVersion]);

  useUnmount(() => {
    events.current?.dispose();
  });

  React.useEffect(() => {
    setVersion({});
  }, [compact]);

  React.useEffect(() => {
    const newIsSomeGroupExpanded = computeIsSomeGroupExpanded(groups);
    if (newIsSomeGroupExpanded !== isSomeGroupExpanded.current) {
      isSomeGroupExpanded.current = newIsSomeGroupExpanded;
      onGroupExpandStateChanged?.(newIsSomeGroupExpanded);
    }
  }, [groups, toggleVersion, onGroupExpandStateChanged, groupExpandedVersion]);

  const onToggleCollapse = React.useCallback(
    (group: IGroup): void => {
      const onToggleCollapseFn = groupProps?.headerProps?.onToggleCollapse;

      if (group) {
        onToggleCollapseFn?.(group);
        group.isCollapsed = !group.isCollapsed;
        setToggleVersion({});
        setVersion({});
      }
    },
    [setToggleVersion, groupProps],
  );

  const onToggleSelectGroup = React.useCallback(
    (group: IGroup): void => {
      if (group && selection && selectionMode === SelectionMode.multiple) {
        selection.toggleRangeSelected(group.startIndex, group.count);
      }
    },
    [selection, selectionMode],
  );

  const onToggleSummarize = React.useCallback(
    (group: IGroup): void => {
      const onToggleSummarizeFn = groupProps?.showAllProps?.onToggleSummarize;

      if (onToggleSummarizeFn) {
        onToggleSummarizeFn(group);
      } else {
        if (group) {
          group.isShowingAll = !group.isShowingAll;
        }

        setVersion({});
        setToggleVersion({});
      }
    },
    [groupProps],
  );

  const getDividerProps = React.useCallback(
    (group: IGroup, flattenedIndex: number) => {
      const isSelected = selection && group ? selection.isRangeSelected(group.startIndex, group.count) : false;

      const dividerProps = {
        group,
        groupIndex: flattenedIndex,
        groupLevel: group.level ?? 0,
        isSelected,
        selected: isSelected,
        viewport,
        selectionMode,
        groups,
        compact,
        onToggleSelectGroup,
        onToggleCollapse,
        onToggleSummarize,
      };

      return dividerProps;
    },
    [compact, groups, onToggleCollapse, onToggleSelectGroup, onToggleSummarize, selection, selectionMode, viewport],
  );

  const renderHeader = React.useCallback(
    (item: IHeaderGroupedItem, flattenedIndex: number): React.ReactNode => {
      const group = item.group;

      const level = group.level ? group.level + 1 : 1;

      const groupHeaderProps = {
        ...groupProps!.headerProps,
        ...getDividerProps(group, flattenedIndex),
        key: group.key,
        groupedListId: item.groupId,
        ariaLevel: level,
        ariaSetSize: groups ? groups.length : undefined,
        ariaPosInSet: flattenedIndex !== undefined ? flattenedIndex + 1 : undefined,
      };

      return onRenderHeader(groupHeaderProps, renderGroupHeader);
    },
    [onRenderHeader, groupProps, groups, getDividerProps],
  );

  const renderShowAll = React.useCallback(
    (item: IShowAllGroupedItem, flattenedIndex: number): React.ReactNode => {
      const group = item.group;
      const groupShowAllProps = {
        ...groupProps!.showAllProps,
        ...getDividerProps(group, flattenedIndex),
        key: group?.key ? `${group.key}-show-all` : undefined,
      };

      return onRenderShowAll(groupShowAllProps, renderGroupShowAll);
    },

    [onRenderShowAll, groupProps, getDividerProps],
  );

  const renderFooter = React.useCallback(
    (item: IFooterGroupedItem, flattenedIndex: number): React.ReactNode => {
      const group = item.group;
      const groupFooterProps = {
        ...groupProps!.footerProps,
        ...getDividerProps(group, flattenedIndex),
        key: group?.key ? `${group.key}-footer` : undefined,
      };

      return onRenderFooter(groupFooterProps, renderGroupFooter);
    },
    [onRenderFooter, groupProps, getDividerProps],
  );

  const renderItem = React.useCallback(
    (item: IGroupedItem, flattenedIndex: number): React.ReactNode => {
      if (item.type === 'header') {
        return renderHeader(item, flattenedIndex);
      } else if (item.type === 'showAll') {
        return renderShowAll(item, flattenedIndex);
      } else if (item.type === 'footer') {
        return renderFooter(item, flattenedIndex);
      } else if (item.type === 'item') {
        const level = item.group.level ? item.group.level + 1 : 1;
        return onRenderCell(level, item.item ?? item, item.itemIndex ?? flattenedIndex);
      }
    },
    [onRenderCell, renderHeader, renderShowAll, renderFooter],
  );

  // const renderItem = React.useCallback(
  //   (item: IGroupedItem, flattenedIndex: number): React.ReactNode => {
  //     const group = item.group;

  //     const level = group.level ? group.level + 1 : 1;
  //     const isSelected = selection && group ? selection.isRangeSelected(group.startIndex, group.count) : false;

  //     const dividerProps = {
  //       group,
  //       groupIndex: flattenedIndex,
  //       groupLevel: group.level ?? 0,
  //       isSelected,
  //       selected: isSelected,
  //       viewport,
  //       selectionMode,
  //       groups,
  //       compact,
  //       onToggleSelectGroup,
  //       onToggleCollapse,
  //       onToggleSummarize,
  //     };

  //     if (item.type === 'header') {
  //       const groupHeaderProps = {
  //         ...groupProps!.headerProps,
  //         ...dividerProps,
  //         key: group.key,
  //         groupedListId: item.groupId,
  //         ariaLevel: level,
  //         ariaSetSize: groups ? groups.length : undefined,
  //         ariaPosInSet: flattenedIndex !== undefined ? flattenedIndex + 1 : undefined,
  //       };

  //       return onRenderHeader(groupHeaderProps, renderGroupHeader);
  //     } else if (item.type === 'showAll') {
  //       const groupShowAllProps = {
  //         ...groupProps!.showAllProps,
  //         ...dividerProps,
  //         key: group?.key ? `${group.key}-show-all` : undefined,
  //       };

  //       return onRenderShowAll(groupShowAllProps, renderGroupShowAll);
  //     } else if (item.type === 'footer') {
  //       const groupFooterProps = {
  //         ...groupProps!.footerProps,
  //         ...dividerProps,
  //         key: group?.key ? `${group.key}-footer` : undefined,
  //       };

  //       return onRenderFooter(groupFooterProps, renderGroupFooter);
  //     } else if (item.type === 'item') {
  //       return onRenderCell(level, item.item ?? item, item.itemIndex ?? flattenedIndex);
  //     }
  //   },
  //   [
  //     onRenderCell,
  //     groups,
  //     groupProps,
  //     selection,
  //     selectionMode,
  //     compact,
  //     viewport,
  //     onToggleCollapse,
  //     onToggleSelectGroup,
  //     onToggleSummarize,
  //     onRenderHeader,
  //     onRenderShowAll,
  //     onRenderFooter,
  //   ],
  // );

  return (
    <FocusZone
      direction={FocusZoneDirection.vertical}
      data-automationid="GroupedList"
      data-is-scrollable="false"
      role="presentation"
      {...focusZoneProps}
      shouldEnterInnerZone={shouldEnterInnerZone}
      className={css(classNames.root, focusZoneProps.className)}
    >
      <List
        ref={listRef}
        role={role}
        items={listView}
        onRenderCellConditional={renderItem}
        usePageCache={usePageCache}
        onShouldVirtualize={onShouldVirtualize}
        getPageSpecification={getPageSpecification}
        version={version}
        getKey={getKey}
        {...rootListProps}
      />
    </FocusZone>
  );
};

export class GroupedListV2Wrapper
  extends React.Component<IGroupedListProps, IGroupedListV2State>
  implements IGroupedList {
  public static displayName: string = 'GroupedListV2';
  private _list = React.createRef<List>();

  public static getDerivedStateFromProps(
    nextProps: IGroupedListProps,
    previousState: IGroupedListV2State,
  ): IGroupedListV2State {
    const { groups } = nextProps;

    if (groups !== previousState.groups) {
      return {
        ...previousState,
        groups,
      };
    }

    return previousState;
  }

  constructor(props: IGroupedListProps) {
    super(props);
    initializeComponentRef(this);

    const { listProps: { version = {} } = {}, groups } = props;
    this.state = {
      version,
      groupExpandedVersion: {},
      groups,
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

  public render(): JSX.Element {
    return <GroupedListV2FC {...this.props} {...this.state} listRef={this._list} />;
  }

  public forceUpdate() {
    super.forceUpdate();
    this._forceListUpdate();
  }

  public toggleCollapseAll(allCollapsed: boolean): void {
    const { groups } = this.state;
    const { groupProps } = this.props;

    if (groups && groups.length > 0) {
      groupProps?.onToggleCollapseAll?.(allCollapsed);

      setGroupsCollapsedState(groups, allCollapsed);
      this.setState({
        groupExpandedVersion: {},
      });

      this.forceUpdate();
    }
  }

  private _forceListUpdate(): void {
    this.setState({
      version: {},
    });
  }
}
