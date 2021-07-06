import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BulletedList2MirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384v128h1536V384H0zm1536 512H0v128h1536V896zm0 512H0v128h1536v-128zm512-1152h-384v384h384V256zm-128 256h-128V384h128v128zm128 256h-384v384h384V768zm-128 256h-128V896h128v128zm128 256h-384v384h384v-384zm-128 256h-128v-128h128v128z" />
    </svg>
  ),
  displayName: 'BulletedList2MirroredIcon',
});

export default BulletedList2MirroredIcon;
