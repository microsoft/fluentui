import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ThumbnailViewMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1152h-640v640h640v-640zm-128 512h-384v-384h384v384zm128-1408h-640v640h640V256zm-128 512h-384V384h384v384zM0 384v128h1152V384H0zm384 384h768V640H384v128zm768 512H0v128h1152v-128zm0 256H384v128h768v-128z" />
    </svg>
  ),
  displayName: 'ThumbnailViewMirroredIcon',
});

export default ThumbnailViewMirroredIcon;
