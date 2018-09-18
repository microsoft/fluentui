import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { HoverCard, IBasicCardProps, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems } from 'office-ui-fabric-react/lib/utilities/exampleData';
import './HoverCard.Example.scss';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/components/Image';
import { getColorFromString } from 'office-ui-fabric-react/lib/Color';

let _items: any[];

export interface IHoverCardExampleState {
  items?: any[];
  columns?: IColumn[];
}

export class HoverCardBasicCardExample extends BaseComponent<{}, IHoverCardExampleState> {
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
          Hover over the <i>color</i> cell of a row item to see the card or use the keyboard to navigate to it.
        </p>
        <p>When using the keyboard to tab to it, the card will open but navigation inside of it will not be available.</p>
        <DetailsList setKey="hoverSet" items={items!} columns={columns} onRenderItemColumn={this._onRenderItemColumn} />
      </div>
    );
  }

  private _onRenderItemColumn = (item: any, index: number, column: IColumn): JSX.Element => {
    const basicCardProps: IBasicCardProps = {
      onRenderBasicCard: this._onRenderBasicCard,
      renderData: item
    };

    if (column.key === 'color') {
      return (
        <HoverCard id="myID1" basicCardProps={basicCardProps} instantOpenOnClick={true} type={HoverCardType.basic}>
          <div className="HoverCard-item" style={{ color: item.color }}>
            {item.color}
          </div>
        </HoverCard>
      );
    }

    return item[column.key];
  };

  private _onRenderBasicCard = (item: any): JSX.Element => {
    const src = item.thumbnail + `/${getColorFromString(item.color)!.hex}`;

    return <Image src={src} width={item.width} height={item.height} imageFit={ImageFit.cover} />;
  };
}

function _buildColumns() {
  return buildColumns(_items).filter(column => column.name === 'color' || column.name === 'width' || column.name === 'height');
}
