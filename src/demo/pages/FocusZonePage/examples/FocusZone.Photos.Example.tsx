/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { FocusZone, Image } from '../../../../index';
import { createArray } from '../../../../utilities/array';
import './FocusZone.Photos.Example.scss';

const PHOTOS = createArray(25, () => {
  const randomWidth = 50 + Math.floor(Math.random() * 150);

  return {
    url: `http://placehold.it/${ randomWidth }x100`,
    width: randomWidth,
    height: 100
  };
});

export const FocusZonePhotosExample = () => (
  <FocusZone>
    <ul className='ms-FocusZoneExamples-photoList'>
      { PHOTOS.map((photo, index) => (
      <div
        key={ index }
        className='ms-FocusZoneExamples-photoCell'
        data-is-focusable={true}
        onClick={ () => console.log('clicked') }>
        <Image src={ photo.url } width={ photo.width } height={ photo.height } />
      </div>
      )) }
    </ul>
  </FocusZone>
);
