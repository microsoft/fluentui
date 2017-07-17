import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import {
  IContextualMenuProps,
  IContextualMenuItem,
  DirectionalHint,
  ContextualMenu,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import {
  CheckboxVisibility,
  ColumnActionsMode,
  ConstrainMode,
  DetailsList,
  DetailsListLayoutMode as LayoutMode,
  IColumn,
  IGroup,
  Selection,
  SelectionMode,
  buildColumns
} from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, isGroupable } from '@uifabric/example-app-base';
import './DetailsList.Advanced.Example.scss';

const DEFAULT_ITEM_LIMIT = 5;
const PAGING_SIZE = 10;
const PAGING_DELAY = 5000;
const ITEMS_COUNT = 5000;

let _items: any;

export interface IDetailsListAdvancedExampleState {
  canResizeColumns?: boolean;
  checkboxVisibility?: CheckboxVisibility;
  columns?: IColumn[];
  constrainMode?: ConstrainMode;
  contextualMenuProps?: IContextualMenuProps;
  groupItemLimit?: number;
  groups?: IGroup[];
  isHeaderVisible?: boolean;
  isLazyLoaded?: boolean;
  isSortedDescending?: boolean;
  items?: any[];
  layoutMode?: LayoutMode;
  selectionMode?: SelectionMode;
  sortedColumnKey?: string;
}

export class DetailsListAdvancedExample extends React.Component<any, IDetailsListAdvancedExampleState> {
  public refs: {
    [key: string]: React.ReactInstance;
    list: DetailsList
  };

  private _isFetchingItems: boolean;
  private _selection: Selection;

  constructor() {
    super();

    if (!_items) {
      _items = createListItems(ITEMS_COUNT);
    }

    this._selection = new Selection();
    this._selection.setItems(_items, false);

    this.state = {
      items: _items,
      groups: undefined,
      groupItemLimit: DEFAULT_ITEM_LIMIT,
      layoutMode: LayoutMode.justified,
      constrainMode: ConstrainMode.horizontalConstrained,
      selectionMode: SelectionMode.multiple,
      canResizeColumns: true,
      checkboxVisibility: CheckboxVisibility.onHover,
      columns: this._buildColumns(_items, true, this._onColumnClick, '', undefined, undefined, this._onColumnContextMenu),
      contextualMenuProps: undefined,
      sortedColumnKey: 'name',
      isSortedDescending: false,
      isLazyLoaded: false,
      isHeaderVisible: true
    };
  }

  public render() {
    let {
      checkboxVisibility,
      columns,
      constrainMode,
      contextualMenuProps,
      groupItemLimit,
      groups,
      isHeaderVisible,
      items,
      layoutMode,
      selectionMode
    } = this.state;

    let isGrouped = groups && groups.length > 0;
    let groupProps = {
      getGroupItemLimit: (group: IGroup) => {
        if (group) {
          return group.isShowingAll ? group.count : Math.min(group.count, groupItemLimit as number);
        } else {
          return items!.length;
        }
      },
      footerProps: {
        showAllLinkText: 'Show all'
      }
    };

    return (
      <div className='ms-DetailsListAdvancedExample'>
        <CommandBar items={ this._getCommandItems() } />

        {
          (isGrouped) ?
            <TextField label='Group Item Limit' onChanged={ this._onItemLimitChanged } /> :
            (null)
        }

        <DetailsList
          ref='list'
          setKey='items'
          items={ items as any[] }
          groups={ groups }
          columns={ columns }
          checkboxVisibility={ checkboxVisibility }
          layoutMode={ layoutMode }
          isHeaderVisible={ isHeaderVisible }
          selectionMode={ selectionMode }
          constrainMode={ constrainMode }
          groupProps={ groupProps }
          onItemInvoked={ this._onItemInvoked }
          onItemContextMenu={ this._onItemContextMenu }
          ariaLabelForListHeader='Column headers. Use menus to perform column operations like sort and filter'
          ariaLabelForSelectAllCheckbox='Toggle selection for all items'
          ariaLabelForSelectionColumn='Toggle selection'
          onRenderMissingItem={ (index) => {
            this._onDataMiss(index as number);
            return null;
          } }
        />

        { contextualMenuProps && (
          <ContextualMenu { ...contextualMenuProps } />
        ) }
      </div>
    );
  }

  private _onDataMiss(index: number) {
    index = Math.floor(index / PAGING_SIZE) * PAGING_SIZE;

    if (!this._isFetchingItems) {

      this._isFetchingItems = true;

      setTimeout(() => {
        this._isFetchingItems = false;
        let itemsCopy = ([] as any[]).concat(this.state.items);

        itemsCopy.splice.apply(itemsCopy, [index, PAGING_SIZE].concat(_items.slice(index, index + PAGING_SIZE)));

        this.setState({
          items: itemsCopy
        });
      }, PAGING_DELAY);
    }
  }

  @autobind
  private _onToggleLazyLoad() {
    let { isLazyLoaded } = this.state;

    isLazyLoaded = !isLazyLoaded;

    this.setState({
      isLazyLoaded: isLazyLoaded,
      items: isLazyLoaded ? _items.slice(0, PAGING_SIZE).concat(new Array(ITEMS_COUNT - PAGING_SIZE)) : _items
    });
  }

  @autobind
  private _onToggleResizing() {
    let { items, canResizeColumns, sortedColumnKey, isSortedDescending } = this.state;

    canResizeColumns = !canResizeColumns;

    this.setState({
      canResizeColumns: canResizeColumns,
      columns: this._buildColumns(items as any[], canResizeColumns, this._onColumnClick, sortedColumnKey, isSortedDescending)
    });
  }

  @autobind
  private _onLayoutChanged(ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) {
    this.setState({
      layoutMode: menuItem.data
    });
  }

  @autobind
  private _onConstrainModeChanged(ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) {
    this.setState({
      constrainMode: menuItem.data
    });
  }

  @autobind
  private _onSelectionChanged(ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) {
    this.setState({
      selectionMode: menuItem.data
    });
  }

  @autobind
  private _onItemLimitChanged(value: string) {
    let newValue = parseInt(value, 10);
    if (isNaN(newValue)) {
      newValue = DEFAULT_ITEM_LIMIT;
    }
    this.setState({
      groupItemLimit: newValue
    });
  }

  private _getCommandItems(): IContextualMenuItem[] {
    let {
      canResizeColumns,
      checkboxVisibility,
      constrainMode,
      isHeaderVisible,
      isLazyLoaded,
      layoutMode,
      selectionMode
    } = this.state;

    return [
      {
        key: 'addRow',
        name: 'Insert row',
        icon: 'Add',
        onClick: this._onAddRow
      },
      {
        key: 'deleteRow',
        name: 'Delete row',
        icon: 'Delete',
        onClick: this._onDeleteRow
      },
      {
        key: 'configure',
        name: 'Configure',
        icon: 'Settings',
        subMenuProps: {
          items: [
            {
              key: 'resizing',
              name: 'Allow column resizing',
              canCheck: true,
              checked: canResizeColumns,
              onClick: this._onToggleResizing
            },
            {
              key: 'headerVisible',
              name: 'Is header visible',
              canCheck: true,
              checked: isHeaderVisible,
              onClick: () => this.setState({ isHeaderVisible: !isHeaderVisible })
            },
            {
              key: 'lazyload',
              name: 'Simulate async loading',
              canCheck: true,
              checked: isLazyLoaded,
              onClick: this._onToggleLazyLoad
            },
            {
              key: 'dash',
              name: '-'
            },
            {
              key: 'checkboxVisibility',
              name: 'Checkbox visibility',
              subMenuProps: {
                items: [
                  {
                    key: 'checkboxVisibility.always',
                    name: 'Always',
                    canCheck: true,
                    isChecked: checkboxVisibility === CheckboxVisibility.always,
                    onClick: () => this.setState({ checkboxVisibility: CheckboxVisibility.always })
                  },
                  {
                    key: 'checkboxVisibility.onHover',
                    name: 'On hover',
                    canCheck: true,
                    isChecked: checkboxVisibility === CheckboxVisibility.onHover,
                    onClick: () => this.setState({ checkboxVisibility: CheckboxVisibility.onHover })
                  },
                  {
                    key: 'checkboxVisibility.hidden',
                    name: 'Hidden',
                    canCheck: true,
                    isChecked: checkboxVisibility === CheckboxVisibility.hidden,
                    onClick: () => this.setState({ checkboxVisibility: CheckboxVisibility.hidden })
                  },
                ]
              }
            },
            {
              key: 'layoutMode',
              name: 'Layout mode',
              subMenuProps: {
                items: [
                  {
                    key: LayoutMode[LayoutMode.fixedColumns],
                    name: 'Fixed columns',
                    canCheck: true,
                    checked: layoutMode === LayoutMode.fixedColumns,
                    onClick: this._onLayoutChanged,
                    data: LayoutMode.fixedColumns
                  },
                  {
                    key: LayoutMode[LayoutMode.justified],
                    name: 'Justified columns',
                    canCheck: true,
                    checked: layoutMode === LayoutMode.justified,
                    onClick: this._onLayoutChanged,
                    data: LayoutMode.justified
                  }
                ]
              }
            },
            {
              key: 'selectionMode',
              name: 'Selection mode',
              subMenuProps: {
                items: [
                  {
                    key: SelectionMode[SelectionMode.none],
                    name: 'None',
                    canCheck: true,
                    checked: selectionMode === SelectionMode.none,
                    onClick: this._onSelectionChanged,
                    data: SelectionMode.none

                  },
                  {
                    key: SelectionMode[SelectionMode.single],
                    name: 'Single select',
                    canCheck: true,
                    checked: selectionMode === SelectionMode.single,
                    onClick: this._onSelectionChanged,
                    data: SelectionMode.single
                  },
                  {
                    key: SelectionMode[SelectionMode.multiple],
                    name: 'Multi select',
                    canCheck: true,
                    checked: selectionMode === SelectionMode.multiple,
                    onClick: this._onSelectionChanged,
                    data: SelectionMode.multiple
                  },
                ]
              }
            },
            {
              key: 'constrainMode',
              name: 'Constrain mode',
              subMenuProps: {
                items: [
                  {
                    key: ConstrainMode[ConstrainMode.unconstrained],
                    name: 'Unconstrained',
                    canCheck: true,
                    checked: constrainMode === ConstrainMode.unconstrained,
                    onClick: this._onConstrainModeChanged,
                    data: ConstrainMode.unconstrained
                  },
                  {
                    key: ConstrainMode[ConstrainMode.horizontalConstrained],
                    name: 'Horizontal constrained',
                    canCheck: true,
                    checked: constrainMode === ConstrainMode.horizontalConstrained,
                    onClick: this._onConstrainModeChanged,
                    data: ConstrainMode.horizontalConstrained
                  }
                ]
              }
            }
          ]
        }
      }
    ];
  }

  private _getContextualMenuProps(ev: React.MouseEvent<HTMLElement>, column: IColumn): IContextualMenuProps {
    let items = [
      {
        key: 'aToZ',
        name: 'A to Z',
        icon: 'SortUp',
        canCheck: true,
        checked: column.isSorted && !column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, false)
      },
      {
        key: 'zToA',
        name: 'Z to A',
        icon: 'SortDown',
        canCheck: true,
        checked: column.isSorted && column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, true)
      }
    ];
    if (isGroupable(column.key)) {
      items.push({
        key: 'groupBy',
        name: 'Group By ' + column.name,
        icon: 'GroupedDescending',
        canCheck: true,
        checked: column.isGrouped,
        onClick: () => this._onGroupByColumn(column)
      });
    }
    return {
      items: items,
      targetElement: ev.currentTarget as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: 10,
      isBeakVisible: true,
      onDismiss: this._onContextualMenuDismissed
    };
  }

  @autobind
  private _onItemInvoked(item: any, index: number) {
    console.log('Item invoked', item, index);
  }

  @autobind
  private _onItemContextMenu(item: any, index: number) {
    console.log('Item context menu invoked', item, index);
  }

  @autobind
  private _onColumnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
    if (column.columnActionsMode !== ColumnActionsMode.disabled) {
      this.setState({
        contextualMenuProps: this._getContextualMenuProps(ev, column)
      });
    }
  }

  @autobind
  private _onColumnContextMenu(column: IColumn, ev: React.MouseEvent<HTMLElement>) {
    if (column.columnActionsMode !== ColumnActionsMode.disabled) {
      this.setState({
        contextualMenuProps: this._getContextualMenuProps(ev, column)
      });
    }
  }

  @autobind
  private _onContextualMenuDismissed() {
    this.setState({
      contextualMenuProps: undefined
    });
  }

  @autobind
  private _onSortColumn(key: string, isSortedDescending: boolean) {
    let sortedItems = _items.slice(0).sort((a: any, b: any) => (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1);

    this.setState({
      items: sortedItems,
      groups: undefined,
      columns: this._buildColumns(
        sortedItems,
        true,
        this._onColumnClick,
        key,
        isSortedDescending,
        undefined,
        this._onColumnContextMenu),
      isSortedDescending: isSortedDescending,
      sortedColumnKey: key
    });
  }

  @autobind
  private _onGroupByColumn(column: IColumn) {
    let { key, isGrouped } = column;
    let { sortedColumnKey, isSortedDescending, groups, items, columns } = this.state;

    if (isGrouped) { // ungroup
      this._onSortColumn(sortedColumnKey as string, !!isSortedDescending);
    } else {
      let groupedItems = [];
      let newGroups = null;
      if (groups) {
        newGroups = groups.concat([]);
        groupedItems = this._groupByKey(newGroups, items as any[], key);
      } else {
        groupedItems = this._groupItems(items as any[], key);
        newGroups = this._getGroups(groupedItems, key);
      }

      let newColumns = columns as IColumn[];
      newColumns.filter(matchColumn => matchColumn.key === key).forEach((groupedColumn: IColumn) => {
        groupedColumn.isGrouped = true;
      });
      this.setState({
        items: groupedItems,
        columns: newColumns,
        groups: newGroups
      });
    }
  }

  private _groupByKey(groups: IGroup[], items: any[], key: string): any[] {
    let groupedItems: any[] = [];
    if (groups) {
      groups.forEach((group: IGroup) => {
        if (group.children && group.children.length > 0) {
          let childGroupedItems = this._groupByKey(group.children, items, key);
          groupedItems = groupedItems.concat(childGroupedItems);
        } else {
          let itemsInGroup = items.slice(group.startIndex, group.startIndex + group.count);
          let nextLevelGroupedItems = this._groupItems(itemsInGroup, key);
          groupedItems = groupedItems.concat(nextLevelGroupedItems);
          group.children = this._getGroups(nextLevelGroupedItems, key, group);
        }
      });
    }
    return groupedItems;
  }

  private _groupItems(items: any[], columnKey: string): any[] {
    return items.slice(0).sort((a, b) => ((a[columnKey] < b[columnKey]) ? -1 : 1));
  }

  private _getGroups(groupedItems: any[], key: string, parentGroup?: IGroup): IGroup[] {
    let separator = '-';
    let groups = groupedItems.reduce((current, item, index) => {
      let currentGroup = current[current.length - 1];

      if (!currentGroup || (this._getLeafGroupKey(currentGroup.key, separator) !== item[key])) {
        current.push({
          key: (parentGroup ? parentGroup.key + separator : '') + item[key],
          name: key + ': ' + item[key],
          startIndex: parentGroup ? parentGroup.startIndex + index : index,
          count: 1,
          level: parentGroup ? parentGroup.level! + 1 : 0
        });
      } else {
        currentGroup.count++;
      }
      return current;
    }, []);

    return groups;
  }

  private _getLeafGroupKey(key: string, separator: string): string {
    let leafKey = key;
    if (key.indexOf(separator) !== -1) {
      let arrKeys = key.split(separator);
      leafKey = arrKeys[arrKeys.length - 1];
    }
    return leafKey;
  }

  @autobind
  private _onAddRow() {
    this.setState({
      items: createListItems(1).concat(this.state.items)
    });
  }

  @autobind
  private _onDeleteRow() {
    this.setState({
      items: this.state.items!.slice(1)
    });
  }

  private _buildColumns(
    items: any[],
    canResizeColumns?: boolean,
    onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => any,
    sortedColumnKey?: string,
    isSortedDescending?: boolean,
    groupedColumnKey?: string,
    onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => any) {
    let columns = buildColumns(items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey);

    columns.forEach(column => {
      column.onColumnContextMenu = onColumnContextMenu;
      column.ariaLabel = `Operations for ${column.name}`;
      if (column.key === 'thumbnail') {
        column.iconName = 'Picture';
        column.isIconOnly = true;
      } else if (column.key === 'description') {
        column.isMultiline = true;
        column.minWidth = 200;
      } else if (column.key === 'name') {
        column.onRender = (item) => (
          <Link>{ item.name }</Link>
        );
      } else if (column.key === 'key') {
        column.columnActionsMode = ColumnActionsMode.disabled;
        column.onRender = (item) => (
          <Link href='#'>{ item.key }</Link>
        );
        column.minWidth = 90;
        column.maxWidth = 90;
      }
    });

    return columns;
  }
}
