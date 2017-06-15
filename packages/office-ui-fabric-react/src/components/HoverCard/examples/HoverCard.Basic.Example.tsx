/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import {
  HoverCardHost,
  IHoverCardProps
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
    }
  }

  public render() {
    let { items, columns } = this.state;

    return (
      <DetailsList
        setKey='hoverSet'
        items={ items }
        columns={ columns }
        onRenderItemColumn={ this._onRenderItemColumn }
      />
    );
  }

  @autobind
  private _onRenderItemColumn(item, index, column) {
    const hoverCardProps: IHoverCardProps = {
      calloutProps: {
        gapSpace: 0
      },
      onRenderCompactContent: this._onRenderCompactContent,
      onRenderExpandedContent: this._onRenderExpandedContent,
      item: item
    }

    if (column.key === 'location') {
      return (
        <HoverCardHost id='myID1' hoverCardProps={ hoverCardProps }>
          <div className='HoverCard-item'>
            { item.location }
          </div>
        </HoverCardHost>
      );
    }

    return item[column.key];
  }

  @autobind
  private _onRenderCompactContent(item: any): JSX.Element {
    return (
      <a target='_blank' href={ `http://wikipedia.org/wiki/${item.location}` }>
        { item.location }
      </a>
    );
  }

  @autobind
  private _onRenderExpandedContent(item: any): JSX.Element {
    return <div> { item.description } </div>
  }
}


function _buildColumns() {
  return buildColumns(_items).filter(column => column.name === 'location' || column.name === 'key');
}