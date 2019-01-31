import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Image } from 'office-ui-fabric-react/lib/Image';
import './FocusZone.Photos.Example.scss';

const MAX_COUNT = 20;
let _counter = 0;

export interface IPhoto {
  id: number;
  url: string;
  width: number;
  height: number;
  onClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

export class FocusZonePhotosExample extends React.Component<{}, { items: IPhoto[] }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: this._getInitialItems()
    };
  }

  public render() {
    const { items } = this.state;

    return (
      <FocusZone elementType="ul" className="ms-FocusZoneExamples-photoList">
        <p>Note: clicking on the items below will remove them, illustrating how FocusZone will retain focus even when items are removed.</p>
        {items.map((item: IPhoto, index) => (
          <li
            key={item.id}
            className="ms-FocusZoneExamples-photoCell"
            aria-posinset={index + 1}
            aria-setsize={items.length}
            aria-label="Photo"
            data-is-focusable={true}
            onClick={item.onClick}
          >
            <Image src={item.url} width={item.width} height={item.height} />
          </li>
        ))}
      </FocusZone>
    );
  }

  private _getInitialItems(): IPhoto[] {
    const items: IPhoto[] = [];

    for (let i = 0; i < MAX_COUNT; i++) {
      items.push(this._createItem());
    }

    return items;
  }

  private _createItem(): IPhoto {
    const randomWidth = 50 + Math.floor(Math.random() * 150);
    const id = _counter++;

    return {
      id,
      url: `http://placehold.it/${randomWidth}x100`,
      width: randomWidth,
      height: 100,
      onClick: (ev: React.MouseEvent<HTMLElement>) => {
        const items: IPhoto[] = this.state.items.filter((item: IPhoto) => item.id !== id);

        this.setState({ items });

        // If we have run out of items, repopulate in a couple seconds.
        if (items.length === 0) {
          setTimeout(() => this.setState({ items: this._getInitialItems() }), 2000);
        }

        ev.preventDefault();
        ev.stopPropagation();
      }
    };
  }
}
