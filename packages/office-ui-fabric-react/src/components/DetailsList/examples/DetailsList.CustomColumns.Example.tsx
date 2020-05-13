import * as React from 'react';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export interface IDetailsListCustomColumnsExampleState {
  sortedItems: IExampleItem[];
  columns: IColumn[];
}

export class DetailsListCustomColumnsExample extends React.Component<{}, IDetailsListCustomColumnsExampleState> {
  constructor(props: {}) {
    super(props);

    const items = createListItems(500);
    this.state = {
      sortedItems: items,
      columns: _buildColumns(items),
    };
  }

  public render() {
    const { sortedItems, columns } = this.state;

    return (
      <DetailsList
        items={sortedItems}
        setKey="set"
        columns={columns}
        onRenderItemColumn={_renderItemColumn}
        onColumnHeaderClick={this._onColumnClick}
        onItemInvoked={this._onItemInvoked}
        onColumnHeaderContextMenu={this._onColumnHeaderContextMenu}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="Row checkbox"
      />
    );
  }

  private _onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns } = this.state;
    let { sortedItems } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    sortedItems = _copyAndSort(sortedItems, column.fieldName!, isSortedDescending);

    // Reset the items and columns to match the state.
    this.setState({
      sortedItems: sortedItems,
      columns: columns.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      }),
    });
  };

  private _onColumnHeaderContextMenu(column: IColumn | undefined, ev: React.MouseEvent<HTMLElement> | undefined): void {
    console.log(`column ${column!.key} contextmenu opened.`);
  }

  private _onItemInvoked(item: any, index: number | undefined): void {
    alert(`Item ${item.name} at index ${index} has been invoked.`);
  }
}

function _buildColumns(items: IExampleItem[]): IColumn[] {
  const columns = buildColumns(items);

  const thumbnailColumn = columns.filter(column => column.name === 'thumbnail')[0];

  // Special case one column's definition.
  thumbnailColumn.name = '';
  thumbnailColumn.maxWidth = 50;
  thumbnailColumn.ariaLabel = 'Thumbnail';

  return columns;
}

function _renderItemColumn(item: IExampleItem, index: number, column: IColumn) {
  const fieldContent = item[column.fieldName as keyof IExampleItem] as string;

  switch (column.key) {
    case 'thumbnail':
      return <Image src={fieldContent} width={50} height={50} imageFit={ImageFit.cover} />;

    case 'name':
      return <Link href="#">{fieldContent}</Link>;

    case 'color':
      return (
        <span
          data-selection-disabled={true}
          className={mergeStyles({ color: fieldContent, height: '100%', display: 'block' })}
        >
          {fieldContent}
        </span>
      );

    default:
      return <span>{fieldContent}</span>;
  }
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}
