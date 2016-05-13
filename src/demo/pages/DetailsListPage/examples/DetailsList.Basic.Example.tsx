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
  TextField,
  buildColumns
} from '../../../../index';
import { SelectionMode } from '../../../../utilities/selection/interfaces';
import { createListItems, isGroupable } from '../../../utilities/data';
import './DetailsList.Basic.Example.scss';

const DEFAULT_ITEM_LIMIT = 5;
const PAGING_SIZE = 10;
const PAGING_DELAY = 5000;
const ITEMS_COUNT = 5000;

let _items;

export interface IDetailsListBasicExampleState {
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
}

export default class DetailsListBasicExample extends React.Component<any, IDetailsListBasicExampleState> {
  private _isFetchingItems: boolean;

  constructor() {
    super();

    if (!_items) {
      _items = createListItems(ITEMS_COUNT);
    }

    this._onToggleResizing = this._onToggleResizing.bind(this);
    this._onToggleLazyLoad = this._onToggleLazyLoad.bind(this);
    this._onLayoutChanged = this._onLayoutChanged.bind(this);
    this._onConstrainModeChanged = this._onConstrainModeChanged.bind(this);
    this._onSelectionChanged = this._onSelectionChanged.bind(this);
    this._onColumnClick = this._onColumnClick.bind(this);
    this._onContextualMenuDismissed = this._onContextualMenuDismissed.bind(this);
    this._onItemLimitChanged = this._onItemLimitChanged.bind(this);

    this.state = {
      items: _items, // createListItems(100).concat(new Array(9900)), // _items,
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
      isLazyLoaded: false
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
      contextualMenuProps
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
      <div className='ms-DetailsListBasicExample'>
        <CommandBar items={ this._getCommandItems() } />

        {
          (isGrouped) ?
            <TextField label='Group Item Limit' onChanged={ this._onItemLimitChanged } /> :
            (null)
        }

        <DetailsList
          setKey='items'
          items={ items }
          groups={ groups }
          columns={ columns }
          layoutMode={ layoutMode }
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

  private _onToggleLazyLoad() {
    let { isLazyLoaded } = this.state;

    isLazyLoaded = !isLazyLoaded;

    this.setState({
      isLazyLoaded: isLazyLoaded,
      items: isLazyLoaded ? _items.slice(0, PAGING_SIZE).concat(new Array(ITEMS_COUNT - PAGING_SIZE)) : _items
    });
  }

  private _onToggleResizing() {
    let { items, canResizeColumns, sortedColumnKey, isSortedDescending } = this.state;

    canResizeColumns = !canResizeColumns;

    this.setState({
      canResizeColumns: canResizeColumns,
      columns: this._buildColumns(items, canResizeColumns, this._onColumnClick, sortedColumnKey, isSortedDescending)
    });
  }

  private _onLayoutChanged(menuItem: IContextualMenuItem) {
    this.setState({
      layoutMode: menuItem.data
    });
  }

  private _onConstrainModeChanged(menuItem: IContextualMenuItem) {
    this.setState({
      constrainMode: menuItem.data
    });
  }

  private _onSelectionChanged(menuItem: IContextualMenuItem) {
    this.setState({
      selectionMode: menuItem.data
    });
  }

  private _onItemLimitChanged(value: string) {
    let newValue = parseInt(value, 10);
    if (isNaN(newValue)) {
      newValue = DEFAULT_ITEM_LIMIT;
    }
    this.setState({
      groupItemLimit: newValue
    });
  }

  private _getCommandItems() {
    let { layoutMode, constrainMode, selectionMode, canResizeColumns, isLazyLoaded } = this.state;

    return [
      {
        key: 'configure',
        name: 'Configure',
        icon: 'gear',
        items: [
          {
            key: 'resizing',
            name: 'Allow column resizing',
            canCheck: true,
            isChecked: canResizeColumns,
            onClick: this._onToggleResizing
          },
          {
            key: 'lazyload',
            name: 'Simulate async loading',
            canCheck: true,
            isChecked: isLazyLoaded,
            onClick: this._onToggleLazyLoad
          },
          {
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

  private _getContextualMenuProps(column: IColumn, ev: React.MouseEvent): IContextualMenuProps {
    let items = [
      {
        key: 'aToZ',
        name: 'A to Z',
        icon: 'arrowUp2',
        canCheck: true,
        isChecked: column.isSorted && !column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, false)
      },
      {
        key: 'zToA',
        name: 'Z to A',
        icon: 'arrowDown2',
        canCheck: true,
        isChecked: column.isSorted && column.isSortedDescending,
        onClick: () => this._onSortColumn(column.key, true)
      }
    ];
    if (isGroupable(column.key)) {
      items.push({
        key: 'groupBy',
        name: 'Group By ' + column.name,
        icon: 'listGroup2',
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

  private _onItemInvoked(item: any, index: number) {
    console.log('Item invoked', item, index);
  }

  private _onColumnClick(column: IColumn, ev: React.MouseEvent) {
    this.setState({
      contextualMenuProps: this._getContextualMenuProps(column, ev)
    });
  }

  private _onContextualMenuDismissed() {
    this.setState({
      contextualMenuProps: null
    });
  }

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

  private _onGroupByColumn(column: IColumn) {
    let { key, isGrouped } = column;
    let { sortedColumnKey, isSortedDescending } = this.state;

    if (isGrouped) { // ungroup
      this._onSortColumn(sortedColumnKey, isSortedDescending);
    } else {
      let groupedItems = _items.slice(0).sort((a, b) => ((a[key] < b[key]) ? -1 : 1));

      let groups = groupedItems.reduce((current, item, index) => {
        let currentGroup = current[current.length - 1];

        if (!currentGroup || (currentGroup.key !== item[key])) {
          current.push({
            key: item[key],
            name: key + ': ' + item[key],
            startIndex: index,
            count: 1
          });
        } else {
          currentGroup.count++;
        }
        return current;
      }, []);

      this.setState({
        items: groupedItems,
        columns: this._buildColumns(groupedItems, true, this._onColumnClick, sortedColumnKey, isSortedDescending, key),
        groups: groups
      });
    }
  }

  private _buildColumns(
    items: any[],
    canResizeColumns?: boolean,
    onColumnClick?: (column: IColumn, ev: React.MouseEvent) => any,
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
        column.onRender = (item) => (
          <Link href='#'>{ item.key }</Link>
        );
        column.minWidth = 90;
        column.maxWidth = 90;
      }
    });

    columns.unshift({
      key: 'icon',
      name: '',
      minWidth: 16,
      maxWidth: 16,
      fieldName: null,
      columnActionsMode: ColumnActionsMode.disabled,
      onRender: () => <i className='ms-DetailsListBasicExample-icon ms-Icon ms-Icon--folder'/>
    });

    return columns;
  }
}
