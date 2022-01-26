import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BulletedListTextMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1664v-128h1664v128H0zm0-384v-128h1664v128H0zm0-384V768h1664v128H0zm0-512h1664v128H0V384z" />
    </svg>
  ),
  displayName: 'BulletedListTextMirroredIcon',
});

export default BulletedListTextMirroredIcon;
