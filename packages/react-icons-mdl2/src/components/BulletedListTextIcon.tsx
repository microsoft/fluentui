import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BulletedListTextIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 1280v-128h1664v128H384zm0 384v-128h1664v128H384zm0-768V768h1664v128H384zm0-512h1664v128H384V384z" />
    </svg>
  ),
  displayName: 'BulletedListTextIcon',
});

export default BulletedListTextIcon;
