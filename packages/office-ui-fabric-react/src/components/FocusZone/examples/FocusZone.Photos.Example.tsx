import * as React from 'react';
import { createArray } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Image } from 'office-ui-fabric-react/lib/Image';
import './FocusZone.Photos.Example.scss';

/* tslint:disable:jsx-no-lambda */

const PHOTOS = createArray(25, index => {
  const randomWidth = 50 + Math.floor(Math.random() * 150);

  return {
    index,
    url: `http://placehold.it/${randomWidth}x100`,
    width: randomWidth,
    height: 100
  };
});

export class FocusZonePhotosExample extends React.Component {
  public state = { items: PHOTOS };

  public render() {
    return (
      <FocusZone elementType="ul" className="ms-FocusZoneExamples-photoList">
        {this.state.items.map((photo, index) => (
          <li
            key={photo.index}
            className="ms-FocusZoneExamples-photoCell"
            aria-posinset={index + 1}
            aria-setsize={PHOTOS.length}
            aria-label="Photo"
            data-is-focusable={true}
            onClick={() => this.setState({ items: this.state.items.filter(item => item !== photo) })}
          >
            <Image src={photo.url} width={photo.width} height={photo.height} />
          </li>
        ))}
      </FocusZone>
    );
  }
}
