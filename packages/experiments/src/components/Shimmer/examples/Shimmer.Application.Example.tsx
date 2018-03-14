/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import {
  HoverCard,
  IExpandingCardProps
} from 'office-ui-fabric-react/lib/HoverCard';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { createListItems } from '@uifabric/example-app-base';
import './Shimmer.Example.scss';

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

let _items: IItem[];

export interface IShimmerApplicationExampleState {
  items?: IItem[];
  columns?: IColumn[];
}

export class ShimmerApplicationExample extends BaseComponent<{}, IShimmerApplicationExampleState> {

  constructor(props: {}) {
    super(props);

    _items = _items || createListItems(10);

    this.state = {
      items: _items,
      columns: _buildColumns()
    };
  }

  public render(): JSX.Element {
    const { items, columns } = this.state;

    return (
      <div>
        <p> Hover over location of a row item to see the card </p>
        <DetailsList
          setKey='hoverSet'
          items={ items! }
          columns={ columns }
          onRenderItemColumn={ this._onRenderItemColumn }
        />
      </div>
    );
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
}

function _buildColumns(): IColumn[] {
  return buildColumns(_items).filter((column: IColumn) => column.name === 'location' || column.name === 'key');
}