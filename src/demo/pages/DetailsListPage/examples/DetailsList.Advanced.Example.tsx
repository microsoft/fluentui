import * as React from 'react';
import {
  ColumnActionsMode,
  CommandBar,
  ConstrainMode,
  ContextualMenu,
  DetailsList,
  DetailsListLayoutMode as LayoutMode,
  DirectionalHint,
  IColumn,
  IContextualMenuItem,
  IContextualMenuProps,
  IGroup,
  Link,
  Selection,
  TextField,
  autobind,
  buildColumns
} from '../../../../index';
import { SelectionMode } from '../../../../utilities/selection/interfaces';
import { createListItems, isGroupable } from '../../../utilities/data';
import './DetailsList.Advanced.Example.scss';

const DEFAULT_ITEM_LIMIT = 5;
const PAGING_SIZE = 10;
const PAGING_DELAY = 5000;
const ITEMS_COUNT = 5000;

let _items;

export interface IDetailsListAdvancedExampleState {
  items?: any[];
  groups?: IGroup[];
  layoutMode?: LayoutMode;
  constrainMode?: ConstrainMode;
  selectionMode?: SelectionMode;
  canResizeColumns?: boolean;
  columns?: IColumn[];
  sortedColumnKey?: string;
  isSortedDescending?: boolean;
  contextualMenuProps?: IContextualMenuProps;
  groupItemLimit?: number;
  isLazyLoaded?: boolean;
  isHeaderVisible?: boolean;
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
      groups: null,
      groupItemLimit: DEFAULT_ITEM_LIMIT,
      layoutMode: LayoutMode.justified,
      constrainMode: ConstrainMode.horizontalConstrained,
      selectionMode: SelectionMode.multiple,
      canResizeColumns: true,
      columns: this._buildColumns(_items, true, this._onColumnClick, ''),
      contextualMenuProps: null,
      sortedColumnKey: 'name',
      isSortedDescending: false,
      isLazyLoaded: false,
      isHeaderVisible: true
    };
  }

  public render() {
    let {
      items,
      groups,
      groupItemLimit,
      layoutMode,
      constrainMode,
      selectionMode,
      columns,
      contextualMenuProps,
      isHeaderVisible
    } = this.state;

    let isGrouped = groups && groups.length > 0;
    let groupProps = {
      getGroupItemLimit: (group: IGroup) => {
        if (group) {
            return group.isShowingAll ? group.count : Math.min(group.count, groupItemLimit);
        } else {
            return items.length;
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
          items={ items }
          groups={ groups }
          columns={ columns }
          layoutMode={ layoutMode }
          isHeaderVisible={ isHeaderVisible }
          selectionMode={ selectionMode }
          constrainMode={ constrainMode }
          groupProps={ groupProps }
          onItemInvoked={ this._onItemInvoked }
          ariaLabelForListHeader='Column headers. Use menus to perform column operations like sort and filter'
          ariaLabelForSelectAllCheckbox='Toggle selection for all items'
          onRenderMissingItem={ (index) => {
            this._onDataMiss(index);
            return null;
          } }
          />

        { contextualMenuProps && (
          <ContextualMenu { ...contextualMenuProps } />
        ) }
      </div>
    );
  }

  private _onDataMiss(index) {
    index = Math.floor(index / PAGING_SIZE) * PAGING_SIZE;

    if (!this._isFetchingItems) {

      this._isFetchingItems = true;

      setTimeout(() => {
        this._isFetchingItems = false;
        let itemsCopy = [].concat(this.state.items);

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
      columns: this._buildColumns(items, canResizeColumns, this._onColumnClick, sortedColumnKey, isSortedDescending)
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
    let { layoutMode, constrainMode, selectionMode, canResizeColumns, isLazyLoaded, isHeaderVisible } = this.state;

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
        items: [
          {
            key: 'resizing',
            name: 'Allow column resizing',
            canCheck: true,
            isChecked: canResizeColumns,
            onClick: this._onToggleResizing
          },
          {
            key: 'headerVisible',
            name: 'Is header visible',
            canCheck: true,
            isChecked: isHeaderVisible,
            onClick: () => this.setState({ isHeaderVisible: !isHeaderVisible })
          },
          {
            key: 'lazyload',
            name: 'Simulate async loading',
            canCheck: true,
            isChecked: isLazyLoaded,
            onClick: this._onToggleLazyLoad
          },
          {
            key: 'dash',
            name: '-'
          },
          {
            key: 'layoutMode',
            name: 'Layout mode',
            items: [
              {
                key: LayoutMode[LayoutMode.fixedColumns],
                name: 'Fixed columns',
                canCheck: true,
                isChecked: layoutMode === LayoutMode.fixedColumns,
                onClick: this._onLayoutChanged,
                data: LayoutMode.fixedColumns
              },
              {
                key: LayoutMode[LayoutMode.justified],
                name: 'Justified columns',
                canCheck: true,
                isChecked: layoutMode === LayoutMode.justified,
                onClick: this._onLayoutChanged,
                data: LayoutMode.justified
              }
            ]
          },
          {
            key: 'selectionMode',
            name: 'Selection mode',
            items: [
              {
                key: SelectionMode[SelectionMode.none],
                name: 'None',
                canCheck: true,
                isChecked: selectionMode === SelectionMode.none,
                onClick: this._onSelectionChanged,
                data: SelectionMode.none

              },
              {
                key: SelectionMode[SelectionMode.single],
                name: 'Single select',
                canCheck: true,
                isChecked: selectionMode === SelectionMode.single,
                onClick: this._onSelectionChanged,
                data: SelectionMode.single
              },
              {
                key: SelectionMode[SelectionMode.multiple],
                name: 'Multi select',
                canCheck: true,
                isChecked: selectionMode === SelectionMode.multiple,
                onClick: this._onSelectionChanged,
                data: SelectionMode.multiple
              },
            ]
          },
          {
            key: 'constrainMode',
            name: 'Constrain mode',
            items: [
              {
                key: ConstrainMode[ConstrainMode.unconstrained],
                name: 'Unconstrained',
                canCheck: true,
                isChecked: constrainMode === ConstrainMode.unconstrained,
                onClick: this._onConstrainModeChanged,
                data: ConstrainMode.unconstrained
              },
              {
                key: ConstrainMode[ConstrainMode.horizontalConstrained],
                name: 'Horizontal constrained',
                canCheck: true,
                isChecked: constrainMode === ConstrainMode.horizontalConstrained,
                onClick: this._onConstrainModeChanged,
                data: ConstrainMode.horizontalConstrained
              }
            ]
          }
        ]
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
        isChecked: column.isSorted && !column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, false)
      },
      {
        key: 'zToA',
        name: 'Z to A',
        icon: 'SortDown',
        canCheck: true,
        isChecked: column.isSorted && column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, true)
      }
    ];
    if (isGroupable(column.key)) {
      items.push({
        key: 'groupBy',
        name: 'Group By ' + column.name,
        icon: 'GroupedDescending',
        canCheck: true,
        isChecked: column.isGrouped,
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
  private _onColumnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
    this.setState({
      contextualMenuProps: this._getContextualMenuProps(ev, column)
    });
  }

  @autobind
  private _onContextualMenuDismissed() {
    this.setState({
      contextualMenuProps: null
    });
  }

  @autobind
  private _onSortColumn(key: string, isSortedDescending: boolean) {
    let sortedItems = _items.slice(0).sort((a, b) => (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1);

    this.setState({
      items: sortedItems,
      groups: null,
      columns: this._buildColumns(sortedItems, true, this._onColumnClick, key, isSortedDescending),
      isSortedDescending: isSortedDescending,
      sortedColumnKey: key
    });
  }

  @autobind
  private _onGroupByColumn(column: IColumn) {
    let { key, isGrouped } = column;
    let { sortedColumnKey, isSortedDescending, groups, items, columns } = this.state;

    if (isGrouped) { // ungroup
      this._onSortColumn(sortedColumnKey, isSortedDescending);
    } else {
      let groupedItems = [];
      let newGroups = null;
      if (groups) {
        newGroups = groups.concat([]);
        groupedItems = this._groupByKey(newGroups, items, key);
      } else {
        groupedItems = this._groupItems(items, key);
        newGroups = this._getGroups(groupedItems, key);
      }

      let newColumns = columns;
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
    let groupedItems = [];
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
          level: parentGroup ? parentGroup.level + 1 : 0
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
      items: this.state.items.slice(1)
    });
  }

  private _buildColumns(
    items: any[],
    canResizeColumns?: boolean,
    onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => any,
    sortedColumnKey?: string,
    isSortedDescending?: boolean,
    groupedColumnKey?: string) {
    let columns = buildColumns(items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey);

    columns.forEach(column => {
      if (column.key === 'description') {
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
