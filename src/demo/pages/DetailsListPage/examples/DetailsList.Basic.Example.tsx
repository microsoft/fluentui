import * as React from 'react';
import {
  CommandBar,
  IColumn,
  DetailsList,
  buildColumns,
  DetailsListLayoutMode as LayoutMode,
  SelectionMode
} from '../../../../components/index';
import { createListItems } from '../../../utilities/data';
import './DetailsList.Basic.Example.scss';

let _items;

export interface IDetailsListBasicExampleState {
  layoutMode?: LayoutMode;
  selectionMode?: SelectionMode;
  canResizeColumns?: boolean;
  columns?: IColumn[];
}

export default class DetailsListBasicExample extends React.Component<any, IDetailsListBasicExampleState> {
  constructor() {
    super();

    if (!_items) {
      _items = createListItems(10000);
    }

    this._onToggleResizing = this._onToggleResizing.bind(this);
    this._onLayoutChanged = this._onLayoutChanged.bind(this);
    this._onSelectionChanged = this._onSelectionChanged.bind(this);

    this.state = {
      layoutMode: LayoutMode.justified,
      selectionMode: SelectionMode.multiple,
      canResizeColumns: true,
      columns: this._getColumns(_items, true)
    };
  }

  public render() {
    let { layoutMode, selectionMode, columns } = this.state;

    return (
      <div className='ms-DetailsListBasicExample'>
        <CommandBar
          items={[
            {
              key: 'configure',
              name: 'Configure',
              icon: 'gear',
              items: [
                {
                  key: 'resizing',
                  name: 'Allow column resizing',
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
                      onClick: this._onLayoutChanged.bind(this, LayoutMode.fixedColumns)
                    },
                    {
                      key: LayoutMode[LayoutMode.justified],
                      name: 'Justified columns',
                      onClick: this._onLayoutChanged.bind(this, LayoutMode.justified)
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
                      onClick: this._onSelectionChanged.bind(this, SelectionMode.none)
                    },
                    {
                      key: SelectionMode[SelectionMode.single],
                      name: 'Single select',
                      onClick: this._onSelectionChanged.bind(this, SelectionMode.single)
                    },
                    {
                      key: SelectionMode[SelectionMode.multiple],
                      name: 'Multi select',
                      onClick: this._onSelectionChanged.bind(this, SelectionMode.multiple)
                    },
                  ]
                }
              ]
            }
          ]
        } />

        <DetailsList
          items={ _items }
          columns={ columns }
          layoutMode={ layoutMode }
          selectionMode={ selectionMode }
        />
      </div>
    );
  }

  private _onToggleResizing() {
    let canResizeColumns = !this.state.canResizeColumns;

    this.setState({
      canResizeColumns: canResizeColumns,
      columns: this._getColumns(_items, canResizeColumns)
    });
  }

  private _onLayoutChanged(layoutMode: LayoutMode) {
    this.setState({
      layoutMode: layoutMode
    });
  }

  private _onSelectionChanged(selectionMode: SelectionMode) {
    this.setState({
      selectionMode: selectionMode
    });
  }

  private _getColumns(items: any[], canResizeColumns: boolean) {
    let columns = buildColumns(items);

    columns.forEach(column => column.isResizable = canResizeColumns);

    return columns;
  }

}

