/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { lorem } from '@uifabric/example-app-base';

let _items: IDocument[] = [];


const fileIcons: { name: string; }[] = [
  { "name": "accdb" },
  { "name": "csv" },
  { "name": "docx" },
  { "name": "dotx" },
  { "name": "mpp" },
  { "name": "mpt" },
  { "name": "odp" },
  { "name": "ods" },
  { "name": "odt" },
  { "name": "one" },
  { "name": "onepkg" },
  { "name": "onetoc" },
  { "name": "potx" },
  { "name": "ppsx" },
  { "name": "pptx" },
  { "name": "pub" },
  { "name": "vsdx" },
  { "name": "vssx" },
  { "name": "vstx" },
  { "name": "xls" },
  { "name": "xlsx" },
  { "name": "xltx" },
  { "name": "xsn" }
];

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
}

export interface IDocument {
  key: number;
  name: string;
  value: string;
  iconName: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
}

export class DetailsListDocumentsExample extends React.Component<any, IDetailsListDocumentsExampleState> {
  private _selection: Selection;

  constructor() {
    super();

    //  Populate with items for demos.
    if (_items.length === 0) {
      for (let i = 0; i < 100; i++) {
        let fileName: string = lorem(2).replace(/\W/g, '');
        let userName: string = lorem(2).replace(/[^a-zA-Z ]/g, "");
        let randomDate = this._randomDate(new Date(2012, 0, 1), new Date());
        let randomFileSize = this._randomFileSize();
        let randomFileType = this._randomFileIcon();
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).concat(`.${randomFileType.docType}`);
        userName = userName.split(' ').map((name: string) => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
        _items.push({
          key: i,
          name: fileName,
          value: fileName,
          iconName: randomFileType.url,
          modifiedBy: userName,
          dateModified: randomDate.dateFormatted,
          dateModifiedValue: randomDate.value,
          fileSize: randomFileSize.value,
          fileSizeRaw: randomFileSize.rawSize
        });
      }
      _items = this._sortItems(_items, 'name');
    }

    const _columns: IColumn[] = [
      {
        key: 'column1',
        name: '',
        headerClassName: 'DetailsListExample-header--FileIcon',
        className: 'DetailsListExample-cell--FileIcon',
        iconClassName: 'ms-Icon--Page DetailsListExample-Header-FileTypeIcon',
        fieldName: 'name',
        minWidth: 16,
        maxWidth: 16,
        onRender: (item: IDocument) => {
          return (
            <img
              src={ item.iconName }
              className={ 'DetailsListExample-documentIconImage' } />
          );
        }
      },
      {
        key: 'column2',
        name: 'Name',
        fieldName: 'name',
        minWidth: 220,
        maxWidth: 440,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
        data: 'string'

      },
      {
        key: 'column3',
        name: 'Date Modified',
        fieldName: 'dateModifiedValue',
        minWidth: 90,
        maxWidth: 130,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'number',
        onRender: (item: IDocument) => {
          return (
            <span
              data-is-focusable={ true }>
              { item.dateModified }
            </span>
          );
        }
      },
      {
        key: 'column4',
        name: 'Modified By',
        fieldName: 'modifiedBy',
        minWidth: 90,
        maxWidth: 130,
        isResizable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return (
            <span
              data-is-focusable={ true }>
              { item.modifiedBy }
            </span>
          );
        }
      },
      {
        key: 'column5',
        name: 'File Size',
        fieldName: 'fileSizeRaw',
        minWidth: 90,
        maxWidth: 130,
        isResizable: true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return (
            <span
              data-is-focusable={ true }>
              { item.fileSize }
            </span>
          );
        }
      },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this.state = {
      items: _items,
      columns: _columns,
      selectionDetails: this._getSelectionDetails()
    };
  }

  public render() {
    let { items, selectionDetails, columns } = this.state;

    return (
      <div>
        <div>{ selectionDetails }</div>
        <TextField
          label='Filter by name:'
          onChanged={ text => this.setState({ items: text ? _items.filter(i => i.name.toLowerCase().indexOf(text) > -1) : _items }) }
        />
        <MarqueeSelection selection={ this._selection }>
          <DetailsList
            items={ items }
            columns={ columns }
            setKey='set'
            layoutMode={ DetailsListLayoutMode.justified }
            isHeaderVisible={ true }
            selection={ this._selection }
            selectionPreservedOnEmptyClick={ true }
            onItemInvoked={ (item) => alert(`Item invoked: ${item.name}`) }
          />
        </MarqueeSelection>
      </div>
    );
  }

  private _randomDate(start: Date, end: Date): { value: number; dateFormatted: string; } {
    const date: Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const dateData = {
      value: date.valueOf(),
      dateFormatted: date.toLocaleDateString()
    }
    return dateData;
  }

  private _randomFileIcon(): { docType: string; url: string; } {
    const docType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
    return {
      docType,
      url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`
    };
  }

  private _randomFileSize(): { value: string; rawSize: number; } {
    const fileSize: number = Math.floor(Math.random() * 100) + 30;
    return {
      value: `${fileSize} KB`,
      rawSize: fileSize
    };
  }

  private _getSelectionDetails(): string {
    let selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  @autobind
  private _onColumnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
    const { columns, items } = this.state;
    let newItems: IDocument[] = items.slice();
    let newColumns: IColumn[] = columns.slice();
    let currColumn: IColumn = newColumns.filter((currCol: IColumn, idx: number) => {
      return column.key === currCol.key;
    })[0];
    newColumns.forEach((column: IColumn) => {
      if (column === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        column.isSorted = false;
        column.isSortedDescending = true;
      }
    });
    newItems = this._sortItems(newItems, currColumn.fieldName, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      items: newItems
    });
  }

  @autobind
  private _sortItems(items: IDocument[], sortBy: string, descending = false): IDocument[] {
    if (descending) {
      return items.sort((a: IDocument, b: IDocument) => {
        if (a[sortBy] < b[sortBy]) return 1;
        if (a[sortBy] > b[sortBy]) return -1;
        return 0;
      });
    } else {
      return items.sort((a: IDocument, b: IDocument) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }
  }
}
