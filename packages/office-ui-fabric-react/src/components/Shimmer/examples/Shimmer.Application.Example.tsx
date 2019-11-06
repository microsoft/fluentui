import * as React from 'react';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { IColumn, buildColumns, SelectionMode, Toggle } from 'office-ui-fabric-react/lib/index';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';

const fileIcons: { name: string }[] = [
  { name: 'accdb' },
  { name: 'csv' },
  { name: 'docx' },
  { name: 'dotx' },
  { name: 'mpt' },
  { name: 'odt' },
  { name: 'one' },
  { name: 'onepkg' },
  { name: 'onetoc' },
  { name: 'pptx' },
  { name: 'pub' },
  { name: 'vsdx' },
  { name: 'xls' },
  { name: 'xlsx' },
  { name: 'xsn' }
];

const ITEMS_COUNT = 200;
const INTERVAL_DELAY = 2500;

let _items: IExampleItem[];

export interface IShimmerApplicationExampleState {
  items: IExampleItem[]; // DetailsList `items` prop is required so it expects at least an empty array.
  columns?: IColumn[];
  isDataLoaded?: boolean;
}

export class ShimmerApplicationExample extends React.Component<{}, IShimmerApplicationExampleState> {
  private _lastIntervalId: number;
  private _lastIndexWithData: number;
  private _async: Async;

  constructor(props: {}) {
    super(props);

    this.state = {
      items: [],
      columns: _buildColumns(),
      isDataLoaded: false
    };

    this._async = new Async(this);
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { items, columns, isDataLoaded } = this.state;

    return (
      <div>
        <Toggle
          label="Toggle to load content"
          style={{ display: 'block', marginBottom: '20px' }}
          checked={isDataLoaded}
          onChange={this._onLoadData}
          onText="Content"
          offText="Shimmer"
        />
        <div>
          <ShimmeredDetailsList
            setKey="items"
            items={items}
            columns={columns}
            selectionMode={SelectionMode.none}
            onRenderItemColumn={this._onRenderItemColumn}
            enableShimmer={!isDataLoaded}
            ariaLabelForShimmer="Content is being fetched"
            ariaLabelForGrid="Item details"
            listProps={{ renderedWindowsAhead: 0, renderedWindowsBehind: 0 }}
          />
        </div>
      </div>
    );
  }

  private _loadData = (): void => {
    this._lastIntervalId = this._async.setInterval(() => {
      const randomQuantity: number = Math.floor(Math.random() * 10) + 1;
      const itemsCopy = this.state.items!.slice(0);
      itemsCopy.splice(
        this._lastIndexWithData,
        randomQuantity,
        ..._items.slice(this._lastIndexWithData, this._lastIndexWithData + randomQuantity)
      );
      this._lastIndexWithData += randomQuantity;
      this.setState({
        items: itemsCopy
      });
    }, INTERVAL_DELAY);
  };

  private _onLoadData = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    if (!_items) {
      _items = createListItems(ITEMS_COUNT);
      _items.map((item: IExampleItem) => {
        const randomFileType = this._randomFileIcon();
        item.thumbnail = randomFileType.url;
      });
    }

    let items: IExampleItem[];
    const randomQuantity: number = Math.floor(Math.random() * 10) + 1;
    if (checked) {
      items = _items.slice(0, randomQuantity).concat(new Array(ITEMS_COUNT - randomQuantity));
      this._lastIndexWithData = randomQuantity;
      this._loadData();
    } else {
      items = [];
      this._async.clearInterval(this._lastIntervalId);
    }
    this.setState({
      isDataLoaded: checked,
      items: items
    });
  };

  private _onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | string | number => {
    if (column.key === 'thumbnail') {
      return <img src={item.thumbnail} />;
    }

    return item[column.key as keyof IExampleItem];
  };

  private _randomFileIcon(): { docType: string; url: string } {
    const docType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
    return {
      docType,
      url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`
    };
  }
}

function _buildColumns(): IColumn[] {
  const _item = createListItems(1);
  const columns: IColumn[] = buildColumns(_item);

  for (const column of columns) {
    if (column.key === 'thumbnail') {
      column.name = 'FileType';
      column.minWidth = 16;
      column.maxWidth = 16;
      column.isIconOnly = true;
      column.iconName = 'Page';
      break;
    }
  }

  return columns;
}
