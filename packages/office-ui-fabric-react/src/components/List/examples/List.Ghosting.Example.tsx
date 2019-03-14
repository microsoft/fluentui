import * as React from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import './List.Ghosting.Example.scss';

export type IExampleItem = { name: string; thumbnail: string };

export interface IListGhostingExampleProps {
  items: IExampleItem[];
}

export class ListGhostingExample extends React.Component<IListGhostingExampleProps> {
  constructor(props: IListGhostingExampleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { items } = this.props;

    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <div className="ms-ListGhostingExample-container" data-is-scrollable={true}>
          <List items={items} onRenderCell={this._onRenderCell} />
        </div>
      </FocusZone>
    );
  }

  private _onRenderCell(item: IExampleItem, index: number, isScrolling: boolean): JSX.Element {
    return (
      <div className="ms-ListGhostingExample-itemCell" data-is-focusable={true}>
        <Image
          className="ms-ListGhostingExample-itemImage"
          src={isScrolling ? undefined : item.thumbnail}
          width={50}
          height={50}
          imageFit={ImageFit.cover}
        />
        <div className="ms-ListGhostingExample-itemContent">
          <div className="ms-ListGhostingExample-itemName">{item.name}</div>
          <div className="ms-ListGhostingExample-itemIndex">{`Item ${index}`}</div>
        </div>
      </div>
    );
  }
}
