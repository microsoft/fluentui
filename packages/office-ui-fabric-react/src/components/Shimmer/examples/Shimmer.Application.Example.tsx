/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { createListItems } from 'office-ui-fabric-react/lib/utilities/exampleData';
import { IColumn, buildColumns, SelectionMode, Toggle } from 'office-ui-fabric-react/lib/index';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import * as ShimmerExampleStyles from './Shimmer.Example.scss';

export interface IItem {
  [index: string]: string | number;
  thumbnail: string;
  key: string;
  name: string;
  description: string;
  color: string;
  shape: string;
  location: string;
  width: number;
  height: number;
}

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

const ITEMS_COUNT = 500;
const INTERVAL_DELAY = 2500;

// tslint:disable-next-line:no-any
let _items: any[];

export interface IShimmerApplicationExampleState {
  items?: IItem[];
  columns?: IColumn[];
  isDataLoaded?: boolean;
  isModalSelection?: boolean;
  isCompactMode?: boolean;
}

export class ShimmerApplicationExample extends BaseComponent<{}, IShimmerApplicationExampleState> {
  private _lastIntervalId: number;
  private _lastIndexWithData: number;

  constructor(props: {}) {
    super(props);

    this.state = {
      items: new Array(),
      columns: _buildColumns(),
      isDataLoaded: false,
      isModalSelection: false,
      isCompactMode: false
    };
  }

  public componentWillUnmount(): void {
    this._async.dispose();
  }

  public render(): JSX.Element {
    const { items, columns, isDataLoaded, isModalSelection, isCompactMode } = this.state;

    return (
      <div>
        <div className={ShimmerExampleStyles.shimmerExampleFlexGroup}>
          <Toggle
            label="Enable Modal Selection"
            checked={isModalSelection}
            onChange={this._onChangeModalSelection}
            onText="Modal"
            offText="Normal"
          />
          <Toggle
            label="Enable Compact Mode"
            checked={isCompactMode}
            onChange={this._onChangeCompactMode}
            onText="Compact"
            offText="Normal"
          />
          <Toggle label="Enable content loading" checked={isDataLoaded} onChange={this._onLoadData} onText="Content" offText="Shimmer" />
        </div>
        <div>
          <ShimmeredDetailsList
            setKey="items"
            items={items!}
            columns={columns}
            compact={isCompactMode}
            selectionMode={this.state.isModalSelection ? SelectionMode.multiple : SelectionMode.none}
            onRenderItemColumn={this._onRenderItemColumn}
            enableShimmer={!isDataLoaded}
            listProps={{ renderedWindowsAhead: 0, renderedWindowsBehind: 0 }}
          />
        </div>
      </div>
    );
  }

  private _loadData = (): void => {
    this._lastIntervalId = this._async.setInterval(() => {
      const randomQuantity: number = Math.floor(Math.random() * 10) + 1;
      // tslint:disable-next-line:no-any
      const itemsCopy = ([] as any[]).concat(this.state.items);
      itemsCopy.splice.apply(
        itemsCopy,
        [this._lastIndexWithData, randomQuantity].concat(_items.slice(this._lastIndexWithData, this._lastIndexWithData + randomQuantity))
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
      _items.map((item: IItem) => {
        const randomFileType = this._randomFileIcon();
        item.thumbnail = randomFileType.url;
      });
    }

    let items: IItem[];
    const randomQuantity: number = Math.floor(Math.random() * 10) + 1;
    if (checked) {
      items = _items.slice(0, randomQuantity).concat(new Array(ITEMS_COUNT - randomQuantity));
      this._lastIndexWithData = randomQuantity;
      this._loadData();
    } else {
      items = new Array();
      this._async.clearInterval(this._lastIntervalId);
    }
    this.setState({
      isDataLoaded: checked,
      items: items
    });
  };

  private _onChangeModalSelection = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isModalSelection: checked });
  };

  private _onChangeCompactMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isCompactMode: checked });
  };

  private _onRenderItemColumn = (item: IItem, index: number, column: IColumn): JSX.Element | string | number => {
    if (column.key === 'thumbnail') {
      return <img src={item.thumbnail} />;
    }

    return item[column.key];
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

  columns.forEach((column: IColumn) => {
    if (column.key === 'thumbnail') {
      column.name = 'FileType';
      column.minWidth = 16;
      column.maxWidth = 16;
      column.isIconOnly = true;
      column.iconName = 'Page';
    }
  });
  return columns;
}
