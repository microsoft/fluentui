import * as React from 'react';
import {
  CommandBar,
  IColumn,
  ConstrainMode,
  DetailsList,
  buildColumns,
  DetailsListLayoutMode as LayoutMode,
  SelectionMode,
  ContextualMenu,
  IContextualMenuItem,
  DirectionalHint,
  IContextualMenuProps
} from '../../../../components/index';
import { createListItems } from '../../../utilities/data';
import './DetailsList.Basic.Example.scss';

let _items;

export interface IDetailsListBasicExampleState {
  items?: any[];
  layoutMode?: LayoutMode;
  constrainMode?: ConstrainMode;
  selectionMode?: SelectionMode;
  canResizeColumns?: boolean;
  columns?: IColumn[];
  sortedColumnKey?: string;
  isSortedDescending?: boolean;
  contextualMenuProps?: IContextualMenuProps;
}

export default class DetailsListBasicExample extends React.Component<any, IDetailsListBasicExampleState> {
  constructor() {
    super();

    if (!_items) {
      _items = createListItems(10000);
    }

    this._onToggleResizing = this._onToggleResizing.bind(this);
    this._onLayoutChanged = this._onLayoutChanged.bind(this);
    this._onConstrainModeChanged = this._onConstrainModeChanged.bind(this);
    this._onSelectionChanged = this._onSelectionChanged.bind(this);
    this._onColumnClick = this._onColumnClick.bind(this);
    this._onContextualMenuDismissed = this._onContextualMenuDismissed.bind(this);

    this.state = {
      items: _items,
      layoutMode: LayoutMode.justified,
      constrainMode: ConstrainMode.horizontalConstrained,
      selectionMode: SelectionMode.multiple,
      canResizeColumns: true,
      columns: buildColumns(_items, true, this._onColumnClick, ''),
      contextualMenuProps: null
    };
  }

  public render() {
    let { items, layoutMode, constrainMode, selectionMode, columns, contextualMenuProps } = this.state;

    return (
      <div className='ms-DetailsListBasicExample'>
        <CommandBar items={ this._getCommandItems() } />

        <DetailsList
          items={ items }
          columns={ columns }
          layoutMode={ layoutMode }
          selectionMode={ selectionMode }
          constrainMode={ constrainMode }
          />

        { contextualMenuProps && (
          <ContextualMenu { ...contextualMenuProps } />
        ) }
      </div>
    );
  }

  private _onToggleResizing() {
    let { items, canResizeColumns, sortedColumnKey, isSortedDescending } = this.state;

    canResizeColumns = !canResizeColumns;

    this.setState({
      canResizeColumns: canResizeColumns,
      columns: buildColumns(items, canResizeColumns, this._onColumnClick, sortedColumnKey, isSortedDescending)
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

  private _getCommandItems() {
    let { layoutMode, constrainMode, selectionMode, canResizeColumns } = this.state;

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
    return {
      items: [
        {
          key: 'aToZ',
          name: 'A to Z',
          icon: 'arrowUp2',
          canCheck: true,
          isChecked: column.isSorted && !column.isSortedDescending,
          onClick: () => this._onSortColumn(column, false)
        },
        {
          key: 'zToA',
          name: 'Z to A',
          icon: 'arrowDown2',
          canCheck: true,
          isChecked: column.isSorted && column.isSortedDescending,
          onClick: () => this._onSortColumn(column, true)
        }
      ],
      targetElement: ev.currentTarget as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: 10,
      isBeakVisible: true,
      onDismiss: this._onContextualMenuDismissed
    };
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

  private _onSortColumn(column: IColumn, isSortedDescending: boolean) {
    let { key } = column;
    let sortedItems = _items.slice(0).sort((a, b) => (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1);

    this.setState({
      items: sortedItems,
      columns: buildColumns(sortedItems, true, this._onColumnClick, column.key, isSortedDescending),
      isSortedDescending: isSortedDescending,
      sortedColumnKey: column.key
    });
  }
}
