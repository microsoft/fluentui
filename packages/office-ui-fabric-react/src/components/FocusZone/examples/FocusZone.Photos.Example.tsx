/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

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

export const FocusZonePhotosExample = () => (
  <FocusZone
    elementType="ul"
    className='ms-FocusZoneExamples-photoList'>
    { PHOTOS.map((photo, index) => (
      <li
        key={ index }
        className='ms-FocusZoneExamples-photoCell'
        aria-posinset={ index + 1 }
        aria-setsize={ PHOTOS.length }
        data-is-focusable={ true }
        onClick={ () => console.log('clicked') }>
        <Image src={ photo.url } width={ photo.width } height={ photo.height } />
      </li>
    )) }
  </FocusZone>
);
