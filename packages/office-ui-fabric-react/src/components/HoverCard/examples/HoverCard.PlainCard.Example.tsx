import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { HoverCard, IPlainCardProps, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems } from 'office-ui-fabric-react/lib/utilities/exampleData';
import './HoverCard.Example.scss';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { getColorFromString } from 'office-ui-fabric-react/lib/Color';

let _items: any[];

export interface IHoverCardExampleState {
  items?: any[];
  columns?: IColumn[];
}

export class HoverCardPlainCardExample extends BaseComponent<{}, IHoverCardExampleState> {
  constructor(props: {}) {
    super(props);

    _items = _items || createListItems(10);

    this.state = {
      items: _items,
      columns: _buildColumns()
    };
  }

  public render() {
    const { items, columns } = this.state;

    return (
      <div>
        <p>
          Hover over the <i>color</i> cell of a row item to see the card.
        </p>
        <DetailsList setKey="hoverSet" items={items!} columns={columns} onRenderItemColumn={this._onRenderItemColumn} />
      </div>
    );
  }

  private _onRenderItemColumn = (item: any, index: number, column: IColumn): JSX.Element => {
    const plainCardProps: IPlainCardProps = {
      onRenderPlainCard: this._onRenderPlainCard,
      renderData: item
    };

    if (column.key === 'color') {
      return (
        <HoverCard id="myID1" plainCardProps={plainCardProps} instantOpenOnClick={true} type={HoverCardType.plain}>
          <div className="HoverCard-item" style={{ color: item.color }}>
            {item.color}
          </div>
        </HoverCard>
      );
    }

    return item[column.key];
  };

  private _onRenderPlainCard = (item: any): JSX.Element => {
    const src = item.thumbnail + `/${getColorFromString(item.color)!.hex}`;

    return <Image src={src} width={item.width} height={item.height} imageFit={ImageFit.cover} />;
  };
}

function _buildColumns() {
  return buildColumns(_items).filter(column => column.name === 'color' || column.name === 'width' || column.name === 'height');
}
