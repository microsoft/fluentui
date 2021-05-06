import * as React from 'react';
import { Link } from '@fluentui/react/lib/Link';
import { TextField } from '@fluentui/react/lib/TextField';
import { Text } from '@fluentui/react/lib/Text';
import { CommandBar, ICommandBarStyles } from '@fluentui/react/lib/CommandBar';
import { Announced } from '@fluentui/react/lib/Announced';
import {
  IContextualMenuProps,
  IContextualMenuItem,
  DirectionalHint,
  ContextualMenu,
} from '@fluentui/react/lib/ContextualMenu';
import {
  CheckboxVisibility,
  ColumnActionsMode,
  ConstrainMode,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IGroup,
  Selection,
  SelectionMode,
  buildColumns,
  IDetailsColumnProps,
} from '@fluentui/react/lib/DetailsList';
import { createListItems, isGroupable, IExampleItem } from '@fluentui/example-data';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import { getTheme, mergeStyleSets } from '@fluentui/react/lib/Styling';

const theme = getTheme();
const headerDividerClass = 'DetailsListAdvancedExample-divider';
const classNames = mergeStyleSets({
  commandBarText: {
    padding: '12px',
  },
  commandBarWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  headerDivider: {
    display: 'inline-block',
    height: '100%',
  },
  headerDividerBar: [
    {
      display: 'none',
      background: theme.palette.themePrimary,
      position: 'absolute',
      top: 16,
      bottom: 0,
      width: '1px',
      zIndex: 5,
    },
    headerDividerClass,
  ],
  linkField: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
  root: {
    selectors: {
      [`.${headerDividerClass}:hover + .${headerDividerClass}`]: {
        display: 'inline',
      },
    },
  },
});

const commandBarStyles: Partial<ICommandBarStyles> = { root: { marginBottom: '40px' } };

const DEFAULT_ITEM_LIMIT = 5;
const PAGING_SIZE = 10;
const PAGING_DELAY = 2000;
const ITEMS_COUNT = 5000;

export interface IDetailsListAdvancedExampleState {
  canResizeColumns?: boolean;
  checkboxVisibility?: CheckboxVisibility;
  columns: IColumn[];
  constrainMode?: ConstrainMode;
  contextualMenuProps?: IContextualMenuProps;
  groupItemLimit?: number;
  groups?: IGroup[];
  isHeaderVisible?: boolean;
  isLazyLoaded?: boolean;
  isSortedDescending?: boolean;
  items: IExampleItem[];
  layoutMode?: DetailsListLayoutMode;
  selectionMode?: SelectionMode;
  sortedColumnKey?: string;
  selectionCount: number;
  announcedMessage?: string;
}

export class DetailsListAdvancedExample extends React.Component<{}, IDetailsListAdvancedExampleState> {
  private _isFetchingItems: boolean;
  private _selection: Selection;
  private _allItems: IExampleItem[];

  constructor(props: {}) {
    super(props);

    this._getCommandItems = memoizeFunction(this._getCommandItems);

    this._allItems = createListItems(ITEMS_COUNT);
    this._selection = new Selection({
      onSelectionChanged: this._onItemsSelectionChanged,
    });
    this._selection.setItems(this._allItems, false);

    this.state = {
      items: this._allItems,
      selectionCount: 0,
      groups: undefined,
      groupItemLimit: DEFAULT_ITEM_LIMIT,
      layoutMode: DetailsListLayoutMode.justified,
      constrainMode: ConstrainMode.horizontalConstrained,
      selectionMode: SelectionMode.multiple,
      canResizeColumns: true,
      checkboxVisibility: CheckboxVisibility.onHover,
      columns: this._buildColumns(
        this._allItems,
        true,
        this._onColumnClick,
        '',
        undefined,
        undefined,
        this._onColumnContextMenu,
      ),
      contextualMenuProps: undefined,
      sortedColumnKey: 'name',
      isSortedDescending: false,
      isLazyLoaded: false,
      isHeaderVisible: true,
    };
  }

  public render(): JSX.Element {
    const {
      canResizeColumns,
      checkboxVisibility,
      columns,
      constrainMode,
      contextualMenuProps,
      groupItemLimit,
      groups,
      isHeaderVisible,
      isLazyLoaded,
      items,
      layoutMode,
      selectionMode,
      announcedMessage,
    } = this.state;

    const isGrouped = groups && groups.length > 0;
    const groupProps = {
      getGroupItemLimit: (group: IGroup) => {
        if (group) {
          return group.isShowingAll ? group.count : Math.min(group.count, groupItemLimit as number);
        } else {
          return items.length;
        }
      },
      footerProps: {
        showAllLinkText: 'Show all',
      },
    };

    return (
      <div className={classNames.root}>
        <div className={classNames.commandBarWrapper}>
          <CommandBar
            styles={commandBarStyles}
            items={this._getCommandItems(
              canResizeColumns,
              checkboxVisibility,
              constrainMode,
              isHeaderVisible,
              isLazyLoaded,
              layoutMode,
              selectionMode,
            )}
          />
          <Text className={classNames.commandBarText}>{`${this.state.selectionCount} selected`}</Text>
        </div>
        <Announced message={`${this.state.selectionCount} selected`} />

        {isGrouped ? <TextField label="Group item limit" onChange={this._onItemLimitChanged} /> : null}

        {announcedMessage ? <Announced message={announcedMessage} /> : undefined}

        <DetailsList
          setKey="items"
          items={items}
          selection={this._selection}
          groups={groups}
          columns={columns}
          checkboxVisibility={checkboxVisibility}
          layoutMode={layoutMode}
          isHeaderVisible={isHeaderVisible}
          selectionMode={selectionMode}
          constrainMode={constrainMode}
          groupProps={groupProps}
          enterModalSelectionOnTouch={true}
          onItemInvoked={this._onItemInvoked}
          onItemContextMenu={this._onItemContextMenu}
          selectionZoneProps={{
            selection: this._selection,
            disableAutoSelectOnInputElements: true,
            selectionMode: selectionMode,
          }}
          ariaLabelForListHeader="Column headers. Click to sort."
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          ariaLabelForSelectionColumn="Toggle selection"
          checkButtonAriaLabel="select row"
          onRenderMissingItem={this._onRenderMissingItem}
        />

        {contextualMenuProps && <ContextualMenu {...contextualMenuProps} />}
      </div>
    );
  }

  private _onRenderDivider = (
    columnProps: IDetailsColumnProps,
    defaultRenderer: (props?: IDetailsColumnProps) => JSX.Element | null,
  ): JSX.Element => {
    const { columnIndex } = columnProps;
    return (
      <React.Fragment key={`divider-wrapper-${columnIndex}`}>
        <span className={classNames.headerDivider}>{defaultRenderer(columnProps)}</span>
        <span className={classNames.headerDividerBar} />
      </React.Fragment>
    );
  };

  private _onDataMiss(index: number): void {
    index = Math.floor(index / PAGING_SIZE) * PAGING_SIZE;

    if (!this._isFetchingItems) {
      this._isFetchingItems = true;

      setTimeout(() => {
        this._isFetchingItems = false;
        const itemsCopy = [...this.state.items];

        itemsCopy.splice(index, PAGING_SIZE).concat(this._allItems.slice(index, index + PAGING_SIZE));

        this.setState({
          items: itemsCopy,
        });
      }, PAGING_DELAY);
    }
  }

  private _onRenderMissingItem = (index: number): null => {
    this._onDataMiss(index);
    return null;
  };

  private _onToggleLazyLoad = (): void => {
    let { isLazyLoaded } = this.state;

    isLazyLoaded = !isLazyLoaded;

    this.setState({
      isLazyLoaded: isLazyLoaded,
      items: isLazyLoaded
        ? this._allItems.slice(0, PAGING_SIZE).concat(new Array(ITEMS_COUNT - PAGING_SIZE))
        : this._allItems,
    });
  };

  private _onToggleHeaderVisible = (): void => {
    this.setState({ isHeaderVisible: !this.state.isHeaderVisible });
  };

  private _onToggleResizing = (): void => {
    const { items, sortedColumnKey, isSortedDescending } = this.state;
    let { canResizeColumns } = this.state;

    canResizeColumns = !canResizeColumns;

    this.setState({
      canResizeColumns: canResizeColumns,
      columns: this._buildColumns(items, canResizeColumns, this._onColumnClick, sortedColumnKey, isSortedDescending),
    });
  };

  private _onCheckboxVisibilityChanged = (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
    this.setState({ checkboxVisibility: menuItem.data });
  };

  private _onLayoutChanged = (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
    this.setState({ layoutMode: menuItem.data });
  };

  private _onConstrainModeChanged = (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
    this.setState({ constrainMode: menuItem.data });
  };

  private _onSelectionChanged = (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem): void => {
    this.setState({ selectionMode: menuItem.data });
  };

  private _onItemLimitChanged = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void => {
    let newValue = parseInt(value, 10);
    if (isNaN(newValue)) {
      newValue = DEFAULT_ITEM_LIMIT;
    }
    this.setState({ groupItemLimit: newValue });
  };

  private _getCommandItems = (
    canResizeColumns?: boolean,
    checkboxVisibility?: CheckboxVisibility,
    constrainMode?: ConstrainMode,
    isHeaderVisible?: boolean,
    isLazyLoaded?: boolean,
    layoutMode?: DetailsListLayoutMode,
    selectionMode?: SelectionMode,
  ): IContextualMenuItem[] => {
    return [
      {
        key: 'addRow',
        text: 'Insert row',
        iconProps: { iconName: 'Add' },
        onClick: this._onAddRow,
      },
      {
        key: 'deleteRow',
        text: 'Delete row',
        iconProps: { iconName: 'Delete' },
        onClick: this._onDeleteRow,
      },
      {
        key: 'configure',
        text: 'Configure',
        iconProps: { iconName: 'Settings' },
        subMenuProps: {
          items: [
            {
              key: 'resizing',
              text: 'Allow column resizing',
              canCheck: true,
              checked: canResizeColumns,
              onClick: this._onToggleResizing,
            },
            {
              key: 'headerVisible',
              text: 'Is header visible',
              canCheck: true,
              checked: isHeaderVisible,
              onClick: this._onToggleHeaderVisible,
            },
            {
              key: 'lazyload',
              text: 'Simulate async loading',
              canCheck: true,
              checked: isLazyLoaded,
              onClick: this._onToggleLazyLoad,
            },
            {
              key: 'dash',
              text: '-',
            },
            {
              key: 'checkboxVisibility',
              text: 'Checkbox visibility',
              subMenuProps: {
                items: [
                  {
                    key: 'checkboxVisibility.always',
                    text: 'Always',
                    canCheck: true,
                    isChecked: checkboxVisibility === CheckboxVisibility.always,
                    onClick: this._onCheckboxVisibilityChanged,
                    data: CheckboxVisibility.always,
                  },
                  {
                    key: 'checkboxVisibility.onHover',
                    text: 'On hover',
                    canCheck: true,
                    isChecked: checkboxVisibility === CheckboxVisibility.onHover,
                    onClick: this._onCheckboxVisibilityChanged,
                    data: CheckboxVisibility.onHover,
                  },
                  {
                    key: 'checkboxVisibility.hidden',
                    text: 'Hidden',
                    canCheck: true,
                    isChecked: checkboxVisibility === CheckboxVisibility.hidden,
                    onClick: this._onCheckboxVisibilityChanged,
                    data: CheckboxVisibility.hidden,
                  },
                ],
              },
            },
            {
              key: 'layoutMode',
              text: 'Layout mode',
              subMenuProps: {
                items: [
                  {
                    key: DetailsListLayoutMode[DetailsListLayoutMode.fixedColumns],
                    text: 'Fixed columns',
                    canCheck: true,
                    checked: layoutMode === DetailsListLayoutMode.fixedColumns,
                    onClick: this._onLayoutChanged,
                    data: DetailsListLayoutMode.fixedColumns,
                  },
                  {
                    key: DetailsListLayoutMode[DetailsListLayoutMode.justified],
                    text: 'Justified columns',
                    canCheck: true,
                    checked: layoutMode === DetailsListLayoutMode.justified,
                    onClick: this._onLayoutChanged,
                    data: DetailsListLayoutMode.justified,
                  },
                ],
              },
            },
            {
              key: 'selectionMode',
              text: 'Selection mode',
              subMenuProps: {
                items: [
                  {
                    key: SelectionMode[SelectionMode.none],
                    text: 'None',
                    canCheck: true,
                    checked: selectionMode === SelectionMode.none,
                    onClick: this._onSelectionChanged,
                    data: SelectionMode.none,
                  },
                  {
                    key: SelectionMode[SelectionMode.single],
                    text: 'Single select',
                    canCheck: true,
                    checked: selectionMode === SelectionMode.single,
                    onClick: this._onSelectionChanged,
                    data: SelectionMode.single,
                  },
                  {
                    key: SelectionMode[SelectionMode.multiple],
                    text: 'Multi select',
                    canCheck: true,
                    checked: selectionMode === SelectionMode.multiple,
                    onClick: this._onSelectionChanged,
                    data: SelectionMode.multiple,
                  },
                ],
              },
            },
            {
              key: 'constrainMode',
              text: 'Constrain mode',
              subMenuProps: {
                items: [
                  {
                    key: ConstrainMode[ConstrainMode.unconstrained],
                    text: 'Unconstrained',
                    canCheck: true,
                    checked: constrainMode === ConstrainMode.unconstrained,
                    onClick: this._onConstrainModeChanged,
                    data: ConstrainMode.unconstrained,
                  },
                  {
                    key: ConstrainMode[ConstrainMode.horizontalConstrained],
                    text: 'Horizontal constrained',
                    canCheck: true,
                    checked: constrainMode === ConstrainMode.horizontalConstrained,
                    onClick: this._onConstrainModeChanged,
                    data: ConstrainMode.horizontalConstrained,
                  },
                ],
              },
            },
          ],
        },
      },
    ];
  };

  private _getContextualMenuProps(ev: React.MouseEvent<HTMLElement>, column: IColumn): IContextualMenuProps {
    const items = [
      {
        key: 'aToZ',
        name: 'A to Z',
        iconProps: { iconName: 'SortUp' },
        canCheck: true,
        checked: column.isSorted && !column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, false),
      },
      {
        key: 'zToA',
        name: 'Z to A',
        iconProps: { iconName: 'SortDown' },
        canCheck: true,
        checked: column.isSorted && column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, true),
      },
    ];
    if (isGroupable(column.key)) {
      items.push({
        key: 'groupBy',
        name: 'Group by ' + column.name,
        iconProps: { iconName: 'GroupedDescending' },
        canCheck: true,
        checked: column.isGrouped,
        onClick: () => this._onGroupByColumn(column),
      });
    }
    return {
      items: items,
      target: ev.currentTarget as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: 10,
      isBeakVisible: true,
      onDismiss: this._onContextualMenuDismissed,
    };
  }

  private _onItemInvoked = (item: IExampleItem, index: number): void => {
    console.log('Item invoked', item, index);
  };

  private _onItemContextMenu = (item: IExampleItem, index: number, ev: MouseEvent): boolean => {
    const contextualMenuProps: IContextualMenuProps = {
      target: ev.target as HTMLElement,
      items: [
        {
          key: 'text',
          name: `${this._selection.getSelectedCount()} selected`,
        },
      ],
      onDismiss: () => {
        this.setState({
          contextualMenuProps: undefined,
        });
      },
    };

    if (index > -1) {
      this.setState({
        contextualMenuProps: contextualMenuProps,
      });
    }

    return false;
  };

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    if (column.columnActionsMode !== ColumnActionsMode.disabled) {
      this.setState({
        contextualMenuProps: this._getContextualMenuProps(ev, column),
      });
    }
  };

  private _onColumnContextMenu = (column: IColumn, ev: React.MouseEvent<HTMLElement>): void => {
    if (column.columnActionsMode !== ColumnActionsMode.disabled) {
      this.setState({
        contextualMenuProps: this._getContextualMenuProps(ev, column),
      });
    }
  };

  private _onContextualMenuDismissed = (): void => {
    this.setState({
      contextualMenuProps: undefined,
    });
  };

  private _onSortColumn = (columnKey: string, isSortedDescending: boolean): void => {
    const sortedItems = _copyAndSort(this._allItems, columnKey, isSortedDescending);

    this.setState({
      items: sortedItems,
      announcedMessage: `${columnKey} is sorted ${isSortedDescending ? 'descending' : 'ascending'}`,
      groups: undefined,
      columns: this._buildColumns(
        sortedItems,
        true,
        this._onColumnClick,
        columnKey,
        isSortedDescending,
        undefined,
        this._onColumnContextMenu,
      ),
      isSortedDescending: isSortedDescending,
      sortedColumnKey: columnKey,
    });
  };

  private _onGroupByColumn = (column: IColumn): void => {
    const { key, isGrouped } = column;
    const { sortedColumnKey, isSortedDescending, groups, items, columns } = this.state;

    if (isGrouped) {
      // ungroup
      this._onSortColumn(sortedColumnKey!, !!isSortedDescending);
    } else {
      let groupedItems = [];
      let newGroups: IGroup[];
      if (groups) {
        newGroups = [...groups];
        groupedItems = this._groupByKey(newGroups, items, key as keyof IExampleItem);
      } else {
        groupedItems = _copyAndSort(items, key);
        newGroups = this._getGroups(groupedItems, key as keyof IExampleItem);
      }

      for (const c of columns) {
        if (c.key === key) {
          c.isGrouped = true;
          break;
        }
      }
      this.setState({
        items: groupedItems,
        columns: [...columns],
        groups: newGroups,
      });
    }
  };

  private _groupByKey(groups: IGroup[], items: IExampleItem[], key: keyof IExampleItem): IExampleItem[] {
    let groupedItems: IExampleItem[] = [];
    if (groups) {
      for (const group of groups) {
        if (group.children && group.children.length > 0) {
          const childGroupedItems = this._groupByKey(group.children, items, key);
          groupedItems = groupedItems.concat(childGroupedItems);
        } else {
          const itemsInGroup = items.slice(group.startIndex, group.startIndex + group.count);
          const nextLevelGroupedItems = _copyAndSort(itemsInGroup, key);
          groupedItems = groupedItems.concat(nextLevelGroupedItems);
          group.children = this._getGroups(nextLevelGroupedItems, key, group);
        }
      }
    }
    return groupedItems;
  }

  private _getGroups(groupedItems: IExampleItem[], key: keyof IExampleItem, parentGroup?: IGroup): IGroup[] {
    const separator = '-';
    const groups = groupedItems.reduce((current: IGroup[], item: IExampleItem, index: number) => {
      const currentGroup = current[current.length - 1];
      const itemColumnValue = item[key];

      if (!currentGroup || this._getLeafGroupKey(currentGroup.key, separator) !== itemColumnValue) {
        current.push({
          key: (parentGroup ? parentGroup.key + separator : '') + itemColumnValue,
          name: key + ': ' + itemColumnValue,
          startIndex: parentGroup ? parentGroup.startIndex + index : index,
          count: 1,
          level: parentGroup ? parentGroup.level! + 1 : 0,
        });
      } else {
        currentGroup.count++;
      }
      return current;
    }, [] as IGroup[]);

    return groups;
  }

  private _getLeafGroupKey(key: string, separator: string): string {
    let leafKey = key;
    if (key.indexOf(separator) !== -1) {
      const arrKeys = key.split(separator);
      leafKey = arrKeys[arrKeys.length - 1];
    }
    return leafKey;
  }

  private _onAddRow = (): void => {
    this.setState({
      items: createListItems(1).concat(this.state.items),
    });
  };

  private _onDeleteRow = (): void => {
    if (this._selection.getSelectedCount() > 0) {
      this.setState((previousState: IDetailsListAdvancedExampleState) => {
        return {
          items: previousState.items.filter((item, index) => !this._selection.isIndexSelected(index)),
        };
      });
    } else {
      this.setState({
        items: this.state.items.slice(1),
      });
    }
  };

  private _onItemsSelectionChanged = () => {
    this.setState({
      selectionCount: this._selection.getSelectedCount(),
    });
  };

  private _buildColumns(
    items: IExampleItem[],
    canResizeColumns?: boolean,
    onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => any,
    sortedColumnKey?: string,
    isSortedDescending?: boolean,
    groupedColumnKey?: string,
    onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => any,
  ) {
    const columns = buildColumns(
      items,
      canResizeColumns,
      onColumnClick,
      sortedColumnKey,
      isSortedDescending,
      groupedColumnKey,
    );

    columns.forEach(column => {
      column.onRenderDivider = this._onRenderDivider;
      column.onColumnContextMenu = onColumnContextMenu;
      column.ariaLabel = `Operations for ${column.name}`;
      if (column.key === 'thumbnail') {
        column.iconName = 'Picture';
        column.isIconOnly = true;
      } else if (column.key === 'description') {
        column.isMultiline = true;
        column.minWidth = 200;
      } else if (column.key === 'name') {
        column.onRender = (item: IExampleItem) => (
          <Link href="#" data-selection-invoke={true}>
            {item.name}
          </Link>
        );
      } else if (column.key === 'key') {
        column.columnActionsMode = ColumnActionsMode.disabled;
        column.onRender = (item: IExampleItem) => (
          <Link className={classNames.linkField} href="https://microsoft.com" target="_blank" rel="noopener">
            {item.key}
          </Link>
        );
        column.minWidth = 90;
        column.maxWidth = 90;
      }
    });

    return columns;
  }
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}
