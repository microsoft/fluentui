import * as React from 'react';
import { HoverCard, IExpandingCardProps } from 'office-ui-fabric-react/lib/HoverCard';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  compactCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  expandedCard: {
    padding: '16px 24px'
  },
  item: {
    selectors: {
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer'
      }
    }
  }
});

export class HoverCardBasicExample extends React.Component<{}, {}> {
  private _items: IExampleItem[] = createListItems(10);
  private _columns: IColumn[] = this._buildColumns();

  public render() {
    return (
      <Fabric>
        <p>
          Hover over the <i>location</i> cell of a row item to see the card or use the keyboard to navigate to it.
        </p>
        <p>When using the keyboard to tab to it, the card will open but navigation inside of it will not be available.</p>
        <DetailsList setKey="hoverSet" items={this._items} columns={this._columns} onRenderItemColumn={this._onRenderItemColumn} />
      </Fabric>
    );
  }

  private _onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | React.ReactText => {
    const expandingCardProps: IExpandingCardProps = {
      onRenderCompactCard: this._onRenderCompactCard,
      onRenderExpandedCard: this._onRenderExpandedCard,
      renderData: item
    };

    if (column.key === 'location') {
      return (
        <HoverCard expandingCardProps={expandingCardProps} instantOpenOnClick={true}>
          <div className={classNames.item}>{item.location}</div>
        </HoverCard>
      );
    }

    return item[column.key as keyof IExampleItem];
  };

  private _onRenderCompactCard = (item: IExampleItem): JSX.Element => {
    return (
      <div className={classNames.compactCard}>
        <a target="_blank" href={`http://wikipedia.org/wiki/${item.location}`}>
          {item.location}
        </a>
      </div>
    );
  };

  private _onRenderExpandedCard = (item: IExampleItem): JSX.Element => {
    return (
      <div className={classNames.expandedCard}>
        {item.description}
        <DetailsList setKey="expandedCardSet" items={this._items} columns={this._columns} />
      </div>
    );
  };

  private _buildColumns(): IColumn[] {
    return buildColumns(this._items).filter(column => column.name === 'location' || column.name === 'key');
  }
}
