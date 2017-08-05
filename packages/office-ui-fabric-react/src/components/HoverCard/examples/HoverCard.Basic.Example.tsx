/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import {
  HoverCard,
  IExpandingCardProps
} from 'office-ui-fabric-react/lib/HoverCard';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { autobind, css } from 'office-ui-fabric-react/lib/Utilities';
import { createListItems } from '@uifabric/example-app-base';
import './HoverCard.Example.scss';

let _items: any[];

export interface IHoverCardExampleState {
  items?: any[];
  columns?: IColumn[];
}

export class HoverCardBasicExample extends BaseComponent<{}, IHoverCardExampleState> {

  constructor(props: {}) {
    super(props);

    _items = _items || createListItems(10);

    this.state = {
      items: _items,
      columns: _buildColumns()
    };
  }

  public render() {
    let { items, columns } = this.state;

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
  private _onRenderItemColumn(item: any, index: number, column: IColumn) {
    const expandingCardProps: IExpandingCardProps = {
      onRenderCompactCard: this._onRenderCompactCard,
      onRenderExpandedCard: this._onRenderExpandedCard,
      renderData: item
    };

    if (column.key === 'location') {
      return (
        <HoverCard id='myID1' expandingCardProps={ expandingCardProps } instantOpenOnClick={ true }>
          <div className='HoverCard-item'>
            { item.location }
          </div>
        </HoverCard>
      );
    }

    return item[column.key];
  }

  @autobind
  private _onRenderCompactCard(item: any): JSX.Element {
    return (
      <div className='hoverCardExample-compactCard'>
        <a target='_blank' href={ `http://wikipedia.org/wiki/${item.location}` }>
          { item.location }
        </a>
      </div>
    );
  }

  @autobind
  private _onRenderExpandedCard(item: any): JSX.Element {
    let { items, columns } = this.state;
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

function _buildColumns() {
  return buildColumns(_items).filter(column => column.name === 'location' || column.name === 'key');
}