import * as React from 'react';
import { HoverCard, IExpandingCardProps, DirectionalHint } from 'office-ui-fabric-react/lib/HoverCard';
import { DetailsList, buildColumns, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { createListItems, IExampleItem } from '@uifabric/example-data';
import { KeyCodes } from 'office-ui-fabric-react/lib/Utilities';
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

interface IHoverCardFieldProps {
  content: string;
  expandingCardProps: IExpandingCardProps;
}

interface IHoverCardFieldState {
  contentRendered?: boolean;
}

class HoverCardField extends React.Component<IHoverCardFieldProps, IHoverCardFieldState> {
  private targetElementRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

  constructor(props: IHoverCardFieldProps) {
    super(props);

    this.state = {
      contentRendered: false
    };
  }

  public componentDidMount() {
    this.setState({ contentRendered: true });
  }

  public render() {
    return (
      <div ref={this.targetElementRef} data-is-focusable={true}>
        {this.props.content}
        {this.state.contentRendered && (
          <HoverCard
            expandingCardProps={this.props.expandingCardProps}
            target={this.targetElementRef.current}
            cardDismissDelay={300}
            onCardVisible={this._log('onCardVisible')}
            onCardHide={this._log('onCardHide')}
            trapFocus={true}
            openHotKey={KeyCodes.enter}
          />
        )}
      </div>
    );
  }

  private _log(text: string): () => void {
    return (): void => {
      console.log(text);
    };
  }
}

export class HoverCardTargetExample extends React.Component<{}, {}> {
  private _items: IExampleItem[] = createListItems(10);
  private _columns: IColumn[] = this._buildColumns();

  public render() {
    return (
      <Fabric>
        <p>
          Hover over the <i>key</i> cell of a row item to see the card or use the keyboard to navigate to it.
        </p>
        <p>
          When using the keyboard to tab to it, open the card with the hotKey and it will automatically focus the first focusable element in
          the card allowing further navigation inside the card.
        </p>
        <DetailsList
          setKey="hoverSet"
          items={this._items}
          columns={this._columns}
          onRenderItemColumn={this._onRenderItemColumn}
          ariaLabel="Hover card DetailsList test"
        />
      </Fabric>
    );
  }

  private _onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | React.ReactText => {
    const expandingCardProps: IExpandingCardProps = {
      onRenderCompactCard: this._onRenderCompactCard,
      onRenderExpandedCard: this._onRenderExpandedCard,
      renderData: item,
      directionalHint: DirectionalHint.rightTopEdge,
      gapSpace: 16
    };

    if (column.key === 'key') {
      return (
        <div className={classNames.item}>
          <HoverCardField content={item.key} expandingCardProps={expandingCardProps} />
        </div>
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

  private _buildColumns() {
    return buildColumns(this._items).filter(column => column.name === 'location' || column.name === 'key');
  }
}
