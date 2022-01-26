import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BulletedListBulletMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1280v-128h128v128h-128zm0 384v-128h128v128h-128zm0-768V768h128v128h-128zm0-512h128v128h-128V384z" />
    </svg>
  ),
  displayName: 'BulletedListBulletMirroredIcon',
});

export default BulletedListBulletMirroredIcon;
