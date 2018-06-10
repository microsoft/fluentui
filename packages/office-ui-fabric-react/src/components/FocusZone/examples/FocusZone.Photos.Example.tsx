import * as React from 'react';

import { createArray } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Image } from 'office-ui-fabric-react/lib/Image';
import './FocusZone.Photos.Example.scss';

const PHOTOS = createArray(25, () => {
  const randomWidth = 50 + Math.floor(Math.random() * 150);

  return {
    url: `http://placehold.it/${randomWidth}x100`,
    width: randomWidth,
    height: 100
  };
});

const log = (): void => {
  console.log('clicked');
};

export const FocusZonePhotosExample = () => (
  <FocusZone
    elementType='ul'
    className='ms-FocusZoneExamples-photoList'
  >
    { PHOTOS.map((photo, index) => (
      <li
        key={ index }
        className='ms-FocusZoneExamples-photoCell'
        aria-posinset={ index + 1 }
        aria-setsize={ PHOTOS.length }
        aria-label='Photo'
        data-is-focusable={ true }
        onClick={ log }
      >
        <Image src={ photo.url } width={ photo.width } height={ photo.height } />
      </li>
    )) }
  </FocusZone>
);
