/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { createListItems } from '@uifabric/example-app-base';

import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import {
  DetailsList,
  buildColumns,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';

let _items: any[];

export interface IDetailsListCustomColumnsExampleState {
  sortedItems?: any[];
  columns?: IColumn[];
}

export class DetailsListCustomColumnsExample extends React.Component<{}, IDetailsListCustomColumnsExampleState> {

  constructor(props: {}) {
    super(props);

    _items = _items || createListItems(500);

    this.state = {
      sortedItems: _items,
      columns: _buildColumns()
    };
  }

  public render() {
    let { sortedItems, columns } = this.state;

    return (
      <DetailsList
        items={ sortedItems as any[] }
        setKey='set'
        columns={ columns }
        onRenderItemColumn={ _renderItemColumn }
        onColumnHeaderClick={ this._onColumnClick.bind(this) }
        onItemInvoked={ (item, index) => alert(`Item ${item.name} at index ${index} has been invoked.`) }
        onColumnHeaderContextMenu={ (column, ev) => console.log(`column ${column!.key} contextmenu opened.`) } />
    );
  }

  private _onColumnClick(event: React.MouseEvent<HTMLElement>, column: IColumn) {
    let { sortedItems, columns } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = sortedItems!.concat([]).sort((a, b) => {
      let firstValue = a[column.fieldName];
      let secondValue = b[column.fieldName];

      if (isSortedDescending) {
        return firstValue > secondValue ? -1 : 1;
      } else {
        return firstValue > secondValue ? 1 : -1;
      }
    });

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: sortedItems,
      columns: columns!.map(col => {
        col.isSorted = (col.key === column.key);

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      })
    });
  }
}

function _buildColumns() {
  let columns = buildColumns(_items);

  let thumbnailColumn = columns.filter(column => column.name === 'thumbnail')[0];

  // Special case one column's definition.
  thumbnailColumn.name = '';
  thumbnailColumn.maxWidth = 50;

  return columns;
}

function _renderItemColumn(item: any, index: number, column: IColumn) {
  let fieldContent = item[column.fieldName];

  switch (column.key) {
    case 'thumbnail':
      return <Image src={ fieldContent } width={ 50 } height={ 50 } imageFit={ ImageFit.cover } />;

    case 'name':
      return <Link href='#'>{ fieldContent }</Link>;

    case 'color':
      return <span data-selection-disabled={ true } style={ { color: fieldContent } }>{ fieldContent }</span>;

    default:
      return <span>{ fieldContent }</span>;
  }
}
