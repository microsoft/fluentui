import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BulletedListMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1280v-128h-128v128h128zm0-384V768h-128v128h128zm-384 0V768H0v128h1664zm384-384V384h-128v128h128zm-384-128H0v128h1664V384zm0 896v-128H0v128h1664zm384 384v-128h-128v128h128zm-384 0v-128H0v128h1664z" />
    </svg>
  ),
  displayName: 'BulletedListMirroredIcon',
});

export default BulletedListMirroredIcon;
