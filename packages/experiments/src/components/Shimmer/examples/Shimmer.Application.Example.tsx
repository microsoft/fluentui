/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import {
  HoverCard,
  IExpandingCardProps
} from 'office-ui-fabric-react/lib/HoverCard';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { createListItems } from '@uifabric/example-app-base';
import './Shimmer.Example.scss';
import {
  Shimmer,
} from 'experiments/lib/Shimmer';
import { IColumn, DetailsList, buildColumns } from 'office-ui-fabric-react';

const PAGING_DELAY = 3000;
const ITEMS_COUNT = 1000;
const PAGING_SIZE = 10;

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

export interface IShimmerElem {
  [index: string]: HTMLElement;
}

// tslint:disable-next-line:no-any
let _items: any[];

const fileIcons: { name: string; }[] = [
  { 'name': 'accdb' },
  { 'name': 'csv' },
  { 'name': 'docx' },
  { 'name': 'dotx' },
  { 'name': 'mpp' },
  { 'name': 'mpt' },
  { 'name': 'odp' },
  { 'name': 'ods' },
  { 'name': 'odt' },
  { 'name': 'one' },
  { 'name': 'onepkg' },
  { 'name': 'onetoc' },
  { 'name': 'potx' },
  { 'name': 'ppsx' },
  { 'name': 'pptx' },
  { 'name': 'pub' },
  { 'name': 'vsdx' },
  { 'name': 'vssx' },
  { 'name': 'vstx' },
  { 'name': 'xls' },
  { 'name': 'xlsx' },
  { 'name': 'xltx' },
  { 'name': 'xsn' }
];

export interface IShimmerApplicationExampleState {
  items?: IItem[];
  columns?: IColumn[];
}

export class ShimmerApplicationExample extends BaseComponent<{}, IShimmerApplicationExampleState> {
  private _isFetchingItems: boolean;

  constructor(props: {}) {
    super(props);

    if (!_items) {
      _items = createListItems(ITEMS_COUNT);
      _items.map((item: IItem) => {
        const randomFileType = this._randomFileIcon();
        item.thumbnail = randomFileType.url;
      });
    }

    this.state = {
      items: _items.slice(0, PAGING_SIZE).concat(new Array(ITEMS_COUNT - PAGING_SIZE)),
      columns: _buildColumns()
    };
  }

  public render(): JSX.Element {
    const { items, columns } = this.state;

    return (
      <div className='shimmerExample-application'>
        <p> Hover over location of a row item to see the card </p>
        <DetailsList
          setKey='items'
          items={ items! }
          columns={ columns }
          onRenderItemColumn={ this._onRenderItemColumn }
          onRenderMissingItem={ this._onRenderMissingItem }
        />
      </div>
    );
  }

  @autobind
  private _onRenderMissingItem(index: number): JSX.Element {
    this._onDataMiss(index as number);
    return (
      <Shimmer />
    );
  }

  private _onDataMiss(index: number): void {
    index = Math.floor(index / PAGING_SIZE) * PAGING_SIZE;

    if (!this._isFetchingItems) {

      this._isFetchingItems = true;

      setTimeout(() => {
        this._isFetchingItems = false;
        // tslint:disable-next-line:no-any
        const itemsCopy = ([] as any[]).concat(this.state.items);
        itemsCopy.splice.apply(itemsCopy, [index, PAGING_SIZE].concat(_items.slice(index, index + PAGING_SIZE)));

        this.setState({
          items: itemsCopy
        });
      }, PAGING_DELAY);
    }
  }

  @autobind
  private _onRenderItemColumn(item: IItem, index: number, column: IColumn): JSX.Element | string | number {
    const expandingCardProps: IExpandingCardProps = {
      onRenderCompactCard: this._onRenderCompactCard,
      onRenderExpandedCard: this._onRenderExpandedCard,
      renderData: item
    };

    if (column.key === 'key') {
      return (
        <HoverCard id='myID1' expandingCardProps={ expandingCardProps } instantOpenOnClick={ true }>
          <div className='HoverCard-item'>
            { item.key }
          </div>
        </HoverCard>
      );
    }

    if (column.key === 'thumbnail') {
      return (
        <img
          src={ item.thumbnail }
        />
      );
    }

    return item[column.key];
  }

  @autobind
  private _onRenderCompactCard(item: IItem): JSX.Element {
    return (
      <div className='hoverCardExample-compactCard'>
        <a target='_blank' href={ `http://wikipedia.org/wiki/${item.location}` }>
          { item.location }
        </a>
      </div>
    );
  }

  @autobind
  private _onRenderExpandedCard(item: IItem): JSX.Element {
    const { items, columns } = this.state;
    return (
      <div className='hoverCardExample-expandedCard'>
        { item.description }
        <DetailsList
          setKey='expandedCardSet'
          items={ items! }
          columns={ columns }
        />
      </div>
    );
  }

  private _randomFileIcon(): { docType: string; url: string; } {
    const docType: string = fileIcons[Math.floor(Math.random() * fileIcons.length) + 0].name;
    return {
      docType,
      url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`
    };
  }
}

function _buildColumns(): IColumn[] {
  const columns: IColumn[] = buildColumns(_items);

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