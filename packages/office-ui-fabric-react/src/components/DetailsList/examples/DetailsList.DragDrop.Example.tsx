import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IColumn, buildColumns } from 'office-ui-fabric-react/lib/DetailsList';
import { IDragDropEvents, IDragDropContext } from 'office-ui-fabric-react/lib/utilities/dragdrop/interfaces';
import './DetailsList.DragDrop.Example.scss';
import { IColumnReorderOptions } from 'office-ui-fabric-react/lib/components/DetailsList';
import { createListItems } from '@uifabric/example-app-base';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

let _draggedItem: any = null;
let _draggedIndex = -1;
let _items: any[];
let _columns: IColumn[];
export class DetailsListDragDropExample extends React.Component<
  {},
  {
    items: {}[];
    selectionDetails?: string;
    columns: IColumn[];
    isColumnReorderEnabled: boolean;
    frozenColumnCountFromStart: string;
    frozenColumnCountFromEnd: string;
  }
  > {
  private _selection: Selection;

  constructor(props: {}) {
    super(props);

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
    this._handleColumnReorder = this._handleColumnReorder.bind(this);
    this._getColumnReorderOptions = this._getColumnReorderOptions.bind(this);
    this._onChangeColumnReorderEnabled = this._onChangeColumnReorderEnabled.bind(this);
    this._onChangeStartCountText = this._onChangeStartCountText.bind(this);
    this._onChangeEndCountText = this._onChangeEndCountText.bind(this);

    this._selection = new Selection();

    _items = _items || createListItems(10, 0);
    _columns = buildColumns(_items, true);

    this.state = {
      items: createListItems(10),
      columns: _columns,
      isColumnReorderEnabled: false,
      frozenColumnCountFromStart: '1',
      frozenColumnCountFromEnd: '0'
    };
  }

  public render(): JSX.Element {
    const {
      items,
      selectionDetails,
      columns,
      isColumnReorderEnabled,
      frozenColumnCountFromStart,
      frozenColumnCountFromEnd
    } = this.state;

    return (
      <div className={ 'detailsListDragDropExample' }>
        <Toggle
          label={ 'Enable Column Reorder' }
          checked={ isColumnReorderEnabled }
          onChanged={ this._onChangeColumnReorderEnabled }
          onText={ 'Enabled' }
          offText={ 'Disabled' }
        />
        <TextField
          label={ 'Number of Left frozen columns:' }
          onGetErrorMessage={ this._validateNumber }
          value={ frozenColumnCountFromStart }
          onChanged={ this._onChangeStartCountText }
        />
        <TextField
          label={ 'Number of Right frozen columns:' }
          onGetErrorMessage={ this._validateNumber }
          value={ frozenColumnCountFromEnd }
          onChanged={ this._onChangeEndCountText }
        />
        <div>{ selectionDetails }</div>
        <MarqueeSelection selection={ this._selection }>
          <DetailsList
            setKey={ 'items' }
            items={ items }
            columns={ columns }
            selection={ this._selection }
            selectionPreservedOnEmptyClick={ true }
            onItemInvoked={ this._onItemInvoked }
            onRenderItemColumn={ this._onRenderItemColumn }
            dragDropEvents={ this._getDragDropEvents() }
            columnReorderOptions={ this.state.isColumnReorderEnabled ? this._getColumnReorderOptions() : undefined }
          />
        </MarqueeSelection>
      </div>
    );
  }

  private _handleColumnReorder(draggedIndex: number, targetIndex: number): void {
    const draggedItems = this.state.columns[draggedIndex];
    const newColumns: IColumn[] = [...this.state.columns];

    // insert before the dropped item
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(targetIndex, 0, draggedItems);
    this.setState({ columns: newColumns });
  }

  private _getColumnReorderOptions(): IColumnReorderOptions {
    return {
      frozenColumnCountFromStart: !isNaN(Number(this.state.frozenColumnCountFromStart))
        ? parseInt(this.state.frozenColumnCountFromStart, 10)
        : undefined,
      frozenColumnCountFromEnd: !isNaN(Number(this.state.frozenColumnCountFromEnd))
        ? parseInt(this.state.frozenColumnCountFromEnd, 10)
        : undefined,
      handleColumnReorder: this._handleColumnReorder
    };
  }

  private _validateNumber(value: string): string {
    return isNaN(Number(value)) ? `The value should be a number, actual is ${value}.` : '';
  }

  private _onChangeStartCountText(text: any): void {
    this.setState({ frozenColumnCountFromStart: text });
  }

  private _onChangeEndCountText(text: any): void {
    this.setState({ frozenColumnCountFromEnd: text });
  }

  private _onChangeColumnReorderEnabled(checked: boolean): void {
    this.setState({ isColumnReorderEnabled: checked });
  }

  private _getDragDropEvents(): IDragDropEvents {
    return {
      canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => { return true; },
      canDrag: (item?: any) => { return true; },
      onDragEnter: (item?: any, event?: DragEvent) => { return 'dragEnter'; }, // return string is the css classes that will be added to the entering element.
      onDragLeave: (item?: any, event?: DragEvent) => { return; },
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
      },
    };
  }

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _onRenderItemColumn(item: any, index: number, column: IColumn): JSX.Element {
    if (column.key === 'name') {
      return <Link data-selection-invoke={ true }>{ item[column.key] }</Link>;
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

    this.setState({ items: items });
  }
}
