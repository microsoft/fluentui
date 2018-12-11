import * as React from 'react';
import { DetailsListLayoutMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { lorem } from 'office-ui-fabric-react/lib/utilities/exampleData';
import './DetailsListExample.scss';

const _items: IDocument[] = [];

const fileIcons: { name: string }[] = [
  { name: 'accdb' },
  { name: 'csv' },
  { name: 'docx' },
  { name: 'dotx' },
  { name: 'mpp' },
  { name: 'mpt' },
  { name: 'odp' },
  { name: 'ods' },
  { name: 'odt' },
  { name: 'one' },
  { name: 'onepkg' },
  { name: 'onetoc' },
  { name: 'potx' },
  { name: 'ppsx' },
  { name: 'pptx' },
  { name: 'pub' },
  { name: 'vsdx' },
  { name: 'vssx' },
  { name: 'vstx' },
  { name: 'xls' },
  { name: 'xlsx' },
  { name: 'xltx' },
  { name: 'xsn' }
];

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
}

export interface IDocument {
  [key: string]: any;
  name: string;
  value: string;
  iconName: string;
  fileType: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
}

export class DetailsListShimmerExample extends React.Component<any, IDetailsListDocumentsExampleState> {
  constructor(props: any) {
    super(props);

    //  Populate with items for demos.
    if (_items.length === 0) {
      for (let i = 0; i < 500; i++) {
        const randomDate = this._randomDate(new Date(2012, 0, 1), new Date());
        const randomFileSize = this._randomFileSize();
        const randomFileType = this._randomFileIcon();
        let fileName: string = lorem(2).replace(/\W/g, '');
        let userName: string = lorem(2).replace(/[^a-zA-Z ]/g, '');
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).concat(`.${randomFileType.docType}`);
        userName = userName
          .split(' ')
          .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
          .join(' ');
        _items.push({
          name: fileName,
          value: fileName,
          iconName: randomFileType.url,
          fileType: randomFileType.docType,
          modifiedBy: userName,
          dateModified: randomDate.dateFormatted,
          dateModifiedValue: randomDate.value,
          fileSize: randomFileSize.value,
          fileSizeRaw: randomFileSize.rawSize
        });
      }
    }

    const _columns: IColumn[] = [
      {
        key: 'column1',
        name: 'File Type',
        headerClassName: 'DetailsListExample-header--FileIcon',
        className: 'DetailsListExample-cell--FileIcon',
        iconClassName: 'DetailsListExample-Header-FileTypeIcon',
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'name',
        minWidth: 16,
        maxWidth: 16,
        onRender: (item: IDocument) => {
          return <img src={item.iconName} className={'DetailsListExample-documentIconImage'} alt={item.fileType + ' file icon'} />;
        }
      },
      {
        key: 'column2',
        name: 'Name',
        fieldName: 'name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        data: 'string',
        isPadded: true
      },
      {
        key: 'column3',
        name: 'Date Modified',
        fieldName: 'dateModifiedValue',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        data: 'number',
        onRender: (item: IDocument) => {
          return <span>{item.dateModified}</span>;
        },
        isPadded: true
      },
      {
        key: 'column4',
        name: 'Modified By',
        fieldName: 'modifiedBy',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: true,
        data: 'string',
        onRender: (item: IDocument) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true
      },
      {
        key: 'column5',
        name: 'File Size',
        fieldName: 'fileSizeRaw',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsable: true,
        data: 'number',
        onRender: (item: IDocument) => {
          return <span>{item.fileSize}</span>;
        }
      }
    ];

    this.state = {
      items: _items,
      columns: _columns
    };
  }

  public render() {
    const { columns, items } = this.state;

    return (
      <ShimmeredDetailsList
        shimmerLines={15}
        enableShimmer={true}
        items={items}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
      />
    );
  }

  private _randomDate(start: Date, end: Date): { value: number; dateFormatted: string } {
    const date: Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const dateData = {
      value: date.valueOf(),
      dateFormatted: date.toLocaleDateString()
    };
    return dateData;
  }

  private _randomFileIcon(): { docType: string; url: string } {
    const docType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
    return {
      docType,
      url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`
    };
  }

  private _randomFileSize(): { value: string; rawSize: number } {
    const fileSize: number = Math.floor(Math.random() * 100) + 30;
    return {
      value: `${fileSize} KB`,
      rawSize: fileSize
    };
  }
}
