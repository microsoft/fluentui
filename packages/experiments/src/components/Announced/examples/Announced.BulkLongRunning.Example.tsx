import * as React from 'react';
import { Announced } from '../Announced';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IColumn, buildColumns } from 'office-ui-fabric-react/lib/DetailsList';
import { IDragDropEvents, IDragDropContext } from 'office-ui-fabric-react/lib/utilities/dragdrop/interfaces';
import './Announced.Example.scss';
import { IColumnReorderOptions } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems } from 'office-ui-fabric-react/lib/utilities/exampleData';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

let _draggedItem: any = null;
let _draggedIndex = -1;
let _items: any[];
let _columns: IColumn[];
export class AnnouncedBulkLongRunningExample extends React.Component<
  {},
  {
    items: {}[];
    selectionDetails?: string;
    columns: IColumn[];
    frozenColumnCountFromStart: string;
    frozenColumnCountFromEnd: string;
    numberOfItems: number;
  }
  > {
  private _selection: Selection;

  constructor(props: {}) {
    super(props);

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
    this._handleColumnReorder = this._handleColumnReorder.bind(this);
    this._getColumnReorderOptions = this._getColumnReorderOptions.bind(this);
    this._onChangeStartCountText = this._onChangeStartCountText.bind(this);
    this._onChangeEndCountText = this._onChangeEndCountText.bind(this);

    this._selection = new Selection();

    _items = _items || createListItems(12, 0);
    _columns = buildColumns(_items, true);

    this.state = {
      items: createListItems(12),
      columns: _columns,
      frozenColumnCountFromStart: '1',
      frozenColumnCountFromEnd: '0',
      numberOfItems: 0
    };
  }

  public render(): JSX.Element {
    const { items, selectionDetails, columns, frozenColumnCountFromStart, frozenColumnCountFromEnd, numberOfItems } = this.state;

    return (
      <div className={'detailsListDragDropExample'}>
        <TextField
          label={'Number of Left frozen columns:'}
          onGetErrorMessage={this._validateNumber}
          value={frozenColumnCountFromStart}
          onChange={this._onChangeStartCountText}
        />
        <TextField
          label={'Number of Right frozen columns:'}
          onGetErrorMessage={this._validateNumber}
          value={frozenColumnCountFromEnd}
          onChange={this._onChangeEndCountText}
        />
        <div>{selectionDetails}</div>
        {this._renderAnnounced(numberOfItems)}
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            setKey={'items'}
            items={items}
            columns={columns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            onRenderItemColumn={this._onRenderItemColumn}
            dragDropEvents={this._getDragDropEvents()}
            columnReorderOptions={this._getColumnReorderOptions()}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
        </MarqueeSelection>
      </div>
    );
  }

  private _renderAnnounced(numberofItems: number): JSX.Element | undefined {
    if (numberofItems > 0) {
      return <Announced message={`${numberofItems} moved`} />;
    }
    return;
  }

  private _handleColumnReorder = (draggedIndex: number, targetIndex: number) => {
    const draggedItems = this.state.columns[draggedIndex];
    const newColumns: IColumn[] = [...this.state.columns];

    // insert before the dropped item
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(targetIndex, 0, draggedItems);
    this.setState({ columns: newColumns });
  };

  private _getColumnReorderOptions(): IColumnReorderOptions {
    return {
      frozenColumnCountFromStart: parseInt(this.state.frozenColumnCountFromStart, 10),
      frozenColumnCountFromEnd: parseInt(this.state.frozenColumnCountFromEnd, 10),
      handleColumnReorder: this._handleColumnReorder
    };
  }

  private _validateNumber(value: string): string {
    return isNaN(Number(value)) ? `The value should be a number, actual is ${value}.` : '';
  }

  private _onChangeStartCountText = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({ frozenColumnCountFromStart: text });
  };

  private _onChangeEndCountText = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({ frozenColumnCountFromEnd: text });
  };

  private _getDragDropEvents(): IDragDropEvents {
    return {
      canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => {
        return true;
      },
      canDrag: (item?: any) => {
        return true;
      },
      onDragEnter: (item?: any, event?: DragEvent) => {
        return 'dragEnter';
      }, // return string is the css classes that will be added to the entering element.
      onDragLeave: (item?: any, event?: DragEvent) => {
        return;
      },
      onDrop: (item?: any, event?: DragEvent) => {
        if (_draggedItem) {
          this._insertBeforeItem(item);
        }
      },
      onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
        _draggedItem = item;
        _draggedIndex = itemIndex!;
      },
      onDragEnd: (item?: any, event?: DragEvent) => {
        _draggedItem = null;
        _draggedIndex = -1;
      }
    };
  }

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _onRenderItemColumn(item: any, index: number, column: IColumn): JSX.Element {
    if (column.key === 'name') {
      return <Link data-selection-invoke={true}>{item[column.key]}</Link>;
    }

    return item[column.key];
  }

  private _insertBeforeItem(item: any): void {
    const draggedItems = this._selection.isIndexSelected(_draggedIndex) ? this._selection.getSelection() : [_draggedItem];

    const items: any[] = this.state.items.filter((i: number) => draggedItems.indexOf(i) === -1);
    let insertIndex = items.indexOf(item);

    // if dragging/dropping on itself, index will be 0.
    if (insertIndex === -1) {
      insertIndex = 0;
    }

    items.splice(insertIndex, 0, ...draggedItems);

    this.setState({ items: items, numberOfItems: draggedItems.length });
  }
}
