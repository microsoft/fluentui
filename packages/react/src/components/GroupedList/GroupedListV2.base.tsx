import * as React from 'react';
import { initializeComponentRef, classNamesFunction, KeyCodes, getRTLSafeKeyCode, css, getId } from '../../Utilities';
import { List, ScrollToMode } from '../../List';
import { SelectionMode } from '../../Selection';
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
import { useMount } from '@fluentui/react-hooks';

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

type IGroupedItem = {
  group?: IGroup;
  groupId?: string;
  item?: any;
  itemIndex?: number;
  type: 'group' | 'item' | 'showAll' | 'footer';
};

type FlattenItemsFn = (
  groups: IGroup[] | undefined,
  items: any[],
  memoItems: IGroupedItem[],
  groupProps: IGroupRenderProps,
) => IGroupedItem[];

const flattenItems: FlattenItemsFn = (groups, items, memoItems, groupProps) => {
  if (groups === undefined) {
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
      type: 'group',
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
        type: 'group',
      };
      index++;
    }

    if (group.isCollapsed !== true) {
      let itemIndex = group.startIndex;
      const renderCount = groupProps.getGroupItemLimit ? groupProps.getGroupItemLimit(group) : Infinity;
      const itemEnd = itemIndex + Math.min(group.count, renderCount);
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

      if (groupProps.footerProps?.footerText) {
        memoItems[index] = {
          group,
          type: 'footer',
        };
        index++;
      }
    }
  }

  memoItems.length = index;

  console.log('MEMO ITEMS', memoItems);

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

const renderGroupHeader = (props: IGroupHeaderProps): JSX.Element => {
  return <GroupHeader {...props} />;
};

const renderGroupShowAll = (props: IGroupShowAllProps): JSX.Element => {
  return <GroupShowAll {...props} />;
};

const renderGroupFooter = (props: IGroupFooterProps): JSX.Element => {
  return <GroupFooter {...props} />;
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

  useMount(() => {
    if (groupProps?.isAllGroupsCollapsed) {
      setGroupsCollapsedState(groups, groupProps.isAllGroupsCollapsed);
    }
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

  const renderItem = React.useCallback(
    (item: IGroupedItem, flattenedIndex: number): React.ReactNode => {
      const group = item.group;

      const level = group?.level ? group.level + 1 : 1;
      const isSelected = selection && group ? selection.isRangeSelected(group.startIndex, group.count) : false;

      const dividerProps = {
        group,
        groupIndex: flattenedIndex,
        groupLevel: group?.level ?? 0,
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

      if (item.type === 'group') {
        const groupHeaderProps = {
          ...groupProps!.headerProps,
          ...dividerProps,
          key: group!.key,
          groupedListId: item.groupId!,
          ariaLevel: level,
          ariaSetSize: groups ? groups.length : undefined,
          ariaPosInSet: flattenedIndex !== undefined ? flattenedIndex + 1 : undefined,
        };

        return onRenderHeader(groupHeaderProps, renderGroupHeader);
      } else if (item.type === 'showAll') {
        const groupShowAllProps = {
          ...groupProps!.showAllProps,
          ...dividerProps,
          key: group?.key ? `${group.key}-show-all` : undefined,
        };

        return onRenderShowAll(groupShowAllProps, renderGroupShowAll);
      } else if (item.type === 'footer') {
        const groupFooterProps = {
          ...groupProps!.footerProps,
          ...dividerProps,
          key: group?.key ? `${group.key}-footer` : undefined,
        };

        return onRenderFooter(groupFooterProps, renderGroupFooter);
      } else {
        return onRenderCell(level, item.item, item.itemIndex ?? flattenedIndex);
      }
    },
    [
      onRenderCell,
      groups,
      groupProps,
      selection,
      selectionMode,
      compact,
      viewport,
      onToggleCollapse,
      onToggleSelectGroup,
      onToggleSummarize,
      onRenderHeader,
      onRenderShowAll,
      onRenderFooter,
    ],
  );

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
        onRenderCell={renderItem}
        usePageCache={usePageCache}
        onShouldVirtualize={onShouldVirtualize}
        version={version}
        {...rootListProps}
      />
    </FocusZone>
  );
};

export class GroupedListV2Wrapper
  extends React.Component<IGroupedListProps, IGroupedListV2State>
  implements IGroupedList {
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
