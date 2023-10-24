import * as React from 'react';
import {
  initializeComponentRef,
  classNamesFunction,
  KeyCodes,
  getRTLSafeKeyCode,
  css,
  getId,
  EventGroup,
  IRenderFunction,
} from '../../Utilities';
import { List, ScrollToMode, IListProps } from '../../List';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../Selection';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import type { IProcessedStyleSet } from '../../Styling';
import type {
  IGroupedList,
  IGroup,
  IGroupRenderProps,
  IGroupedListStyleProps,
  IGroupedListStyles,
} from './GroupedList.types';
import type {
  IGroupedListV2,
  IGroupedListV2Props,
  IItemGroupedItem,
  IShowAllGroupedItem,
  IFooterGroupedItem,
  IHeaderGroupedItem,
  IGroupedItem,
} from './GroupedListV2.types';
import { GroupHeader } from './GroupHeader';
import { GroupShowAll } from './GroupShowAll';
import { GroupFooter } from './GroupFooter';
import type { IGroupHeaderProps } from './GroupHeader';
import type { IGroupShowAllProps } from './GroupShowAll.styles';
import type { IGroupFooterProps } from './GroupFooter.types';

export interface IGroupedListV2State {
  selectionMode?: IGroupedListV2Props['selectionMode'];
  compact?: IGroupedListV2Props['compact'];
  groups?: IGroup[];
  items?: IGroupedListV2Props['items'];
  listProps?: IGroupedListV2Props['listProps'];
  version: {};
  groupExpandedVersion: {};
}

type FlattenItems = (
  groups: IGroup[] | undefined,
  items: any[],
  memoItems: IGroupedItem[],
  groupProps: IGroupRenderProps['getGroupItemLimit'],
) => IGroupedItem[];

type GroupStackItem = {
  group: IGroup;
  groupIndex: number;
};

const flattenItems: FlattenItems = (groups, items, memoItems, getGroupItemLimit) => {
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

  const stack: GroupStackItem[] = [];
  let j = groups.length - 1;
  while (j >= 0) {
    stack.push({ group: groups[j], groupIndex: j + 1 });
    j--;
  }

  while (stack.length > 0) {
    // eslint-disable-next-line prefer-const
    let { group, groupIndex } = stack.pop()!;
    memoItems[index] = {
      group,
      groupId: getId('GroupedListSection'),
      type: 'header',
      groupIndex,
    };

    index++;

    while (group.isCollapsed !== true && group?.children && group.children.length > 0) {
      j = group.children.length - 1;
      while (j > 0) {
        stack.push({ group: group.children[j], groupIndex: j + 1 });
        j--;
      }
      group = group.children[0];
      memoItems[index] = {
        group,
        groupId: getId('GroupedListSection'),
        type: 'header',
        groupIndex: 1,
      };
      index++;
    }

    if (group.isCollapsed !== true) {
      let itemIndex = group.startIndex;
      const renderCount = getGroupItemLimit ? getGroupItemLimit(group) : Infinity;
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

type UseIsGroupSelected = (
  startIndex: number,
  count: number,
  selection?: ISelection,
  eventGroup?: EventGroup,
) => boolean;

const useIsGroupSelected: UseIsGroupSelected = (startIndex, count, selection, eventGroup) => {
  const [isSelected, setIsSelected] = React.useState(() => selection?.isRangeSelected(startIndex, count) ?? false);

  React.useEffect(() => {
    if (selection && eventGroup) {
      const changeHandler = () => {
        setIsSelected(selection?.isRangeSelected(startIndex, count) ?? false);
      };

      eventGroup.on(selection, SELECTION_CHANGE, changeHandler);

      return () => {
        eventGroup?.off(selection, SELECTION_CHANGE, changeHandler);
      };
    }
  }, [startIndex, count, selection, eventGroup]);

  return isSelected;
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
  switch (item.type) {
    case 'item':
      return item.item?.key ?? null;

    case 'header':
      return item.group.key;

    case 'footer':
      return `${item.group.key}-footer`;

    case 'showAll':
      return `${item.group.key}-showAll`;
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

    listProps,
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
    groupedListRef,
    groupExpandedVersion,
    version: versionFromProps,
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
  const listRef = React.useRef<List>(null);

  const [version, setVersion] = React.useState({});
  const [toggleVersion, setToggleVersion] = React.useState({});

  // eslint-disable-next-line deprecation/deprecation
  const { shouldEnterInnerZone = isInnerZoneKeystroke } = focusZoneProps;

  const listView = React.useMemo(() => {
    return flattenItems(groups, items, flatList.current, groupProps?.getGroupItemLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, groupProps?.getGroupItemLimit, items, toggleVersion, flatList, groupExpandedVersion]);

  const getPageSpecification = React.useCallback(
    (flattenedIndex: number): { key?: string } => {
      const pageGroup = listView[flattenedIndex];
      return {
        key: pageGroup.type === 'header' ? pageGroup.group.key : undefined,
      };
    },
    [listView],
  );

  React.useImperativeHandle(
    groupedListRef,
    () => {
      let indexMap: number[] | undefined;

      return {
        scrollToIndex: (
          index: number,
          measureItem?: (itemIndex: number) => number,
          scrollToMode?: ScrollToMode,
        ): void => {
          indexMap =
            indexMap ??
            listView.reduce((map, item, listIndex) => {
              if (item.type === 'item') {
                map[item.itemIndex] = listIndex;
              }
              return map;
            }, [] as number[]);

          const scrollIndex = indexMap[index];
          const measure =
            typeof measureItem === 'function'
              ? (itemIndex: number): number => {
                  if (listView[itemIndex]?.type === 'item') {
                    return measureItem((listView[itemIndex] as IItemGroupedItem).itemIndex);
                  }

                  return 0;
                }
              : undefined;

          listRef.current?.scrollToIndex(scrollIndex, measure, scrollToMode);
        },

        getStartItemIndexInView: (): number => {
          return listRef.current?.getStartItemIndexInView() || 0;
        },
      };
    },
    [listView, listRef],
  );

  React.useEffect(() => {
    if (groupProps?.isAllGroupsCollapsed) {
      setGroupsCollapsedState(groups, groupProps.isAllGroupsCollapsed);
    }
    events.current = new EventGroup(this);

    return () => {
      events.current?.dispose();
      events.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setVersion({});
  }, [versionFromProps]);

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

  const onToggleSelectGroup = (group: IGroup): void => {
    if (group && selection && selectionMode === SelectionMode.multiple) {
      selection.toggleRangeSelected(group.startIndex, group.count);
    }
  };

  const onToggleSummarize = (group: IGroup): void => {
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
  };

  const getDividerProps = (group: IGroup, flattenedIndex: number) => {
    const dividerProps = {
      group,
      groupIndex: flattenedIndex,
      groupLevel: group.level ?? 0,
      viewport,
      selectionMode,
      groups,
      compact,
      onToggleSelectGroup,
      onToggleCollapse,
      onToggleSummarize,
    };

    return dividerProps;
  };

  const renderHeader = (item: IHeaderGroupedItem, flattenedIndex: number): React.ReactNode => {
    const group = item.group;

    let ariaProps;
    if (role === 'treegrid') {
      // GroupedList default role
      ariaProps = {
        ariaLevel: group.level ? group.level + 1 : 1,
        ariaSetSize: groups ? groups.length : undefined,
        ariaPosInSet: item.groupIndex,
      };
    } else {
      // Grouped DetailsList
      ariaProps = {
        ariaRowIndex: flattenedIndex,
      };
    }

    const headerProps = {
      ...groupProps!.headerProps,
      ...getDividerProps(item.group, flattenedIndex),
      key: group.key,
      groupedListId: item.groupId,
      ...ariaProps,
    };

    return (
      <GroupItem
        render={onRenderHeader}
        defaultRender={renderGroupHeader}
        item={item}
        selection={selection}
        eventGroup={events.current}
        props={headerProps}
      />
    );
  };

  const renderShowAll = (item: IShowAllGroupedItem, flattenedIndex: number): React.ReactNode => {
    const group = item.group;
    const groupShowAllProps = {
      ...groupProps!.showAllProps,
      ...getDividerProps(group, flattenedIndex),
      key: group.key ? `${group.key}-show-all` : undefined,
    };

    return onRenderShowAll(groupShowAllProps, renderGroupShowAll);
  };

  const renderFooter = (item: IFooterGroupedItem, flattenedIndex: number): React.ReactNode => {
    const group = item.group;
    const groupFooterProps = {
      ...groupProps!.footerProps,
      ...getDividerProps(group, flattenedIndex),
      key: group.key ? `${group.key}-footer` : undefined,
    };

    return onRenderFooter(groupFooterProps, renderGroupFooter);
  };

  const renderItem = (item: IGroupedItem, flattenedIndex: number): React.ReactNode => {
    if (item.type === 'header') {
      return renderHeader(item, flattenedIndex);
    } else if (item.type === 'showAll') {
      return renderShowAll(item, flattenedIndex);
    } else if (item.type === 'footer') {
      return renderFooter(item, flattenedIndex);
    } else {
      const level = item.group.level ? item.group.level + 1 : 1;
      return onRenderCell(level, item.item, item.itemIndex ?? flattenedIndex, item.group);
    }
  };

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
        // eslint-disable-next-line
        onRenderCellConditional={renderItem}
        usePageCache={usePageCache}
        onShouldVirtualize={onShouldVirtualize}
        getPageSpecification={getPageSpecification}
        version={version}
        getKey={getKey}
        {...listProps}
        {...rootListProps}
      />
    </FocusZone>
  );
};

interface IGroupItemProps<T> {
  props: T;
  render: IRenderFunction<T>;
  defaultRender: (props?: T) => JSX.Element | null;
  item: any;
  selection?: ISelection;
  eventGroup?: EventGroup;
}

const GroupItem = <T,>({
  render,
  defaultRender,
  item,
  selection,
  eventGroup,
  props,
}: React.PropsWithChildren<IGroupItemProps<T>>): React.ReactElement | null => {
  const group = item.group;

  const isSelected = useIsGroupSelected(group.startIndex, group.count, selection, eventGroup);
  const mergedProps = {
    ...props,
    isSelected,
    selected: isSelected,
  };
  return render(mergedProps, defaultRender);
};

export class GroupedListV2Wrapper
  extends React.Component<IGroupedListV2Props, IGroupedListV2State>
  implements IGroupedList
{
  public static displayName: string = 'GroupedListV2';
  private _groupedList = React.createRef<IGroupedListV2>();

  public static getDerivedStateFromProps(
    nextProps: IGroupedListV2Props,
    previousState: IGroupedListV2State,
  ): IGroupedListV2State {
    const { groups, selectionMode, compact, items, listProps } = nextProps;
    const nextListVersion = listProps && listProps.version;

    const nextState = {
      ...previousState,
      groups,
    };

    if (
      nextListVersion !== previousState.version ||
      items !== previousState.items ||
      groups !== previousState.groups ||
      selectionMode !== previousState.selectionMode ||
      compact !== previousState.compact
    ) {
      nextState.version = {};
    }

    return nextState;
  }

  constructor(props: IGroupedListV2Props) {
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
    this._groupedList.current?.scrollToIndex(index, measureItem, scrollToMode);
  }

  public getStartItemIndexInView(): number {
    return this._groupedList.current?.getStartItemIndexInView() || 0;
  }

  public render(): JSX.Element {
    return <GroupedListV2FC {...this.props} {...this.state} groupedListRef={this._groupedList} />;
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
