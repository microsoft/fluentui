import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TimelineMatrixViewIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 256v384h1920v128h-384v384h384v128h-384v384h384v128h-384v128h-128v-128H896v128H768v-128H128v128H0V128h2048v128H128zm640 1408v-384H128v384h640zm768-384H896v384h640v-384zm0-512H896v384h640V768zm-1408 0v384h640V768H128z" />
    </svg>
  ),
  displayName: 'TimelineMatrixViewIcon',
});

export default TimelineMatrixViewIcon;
