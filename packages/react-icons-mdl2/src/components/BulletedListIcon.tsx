import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BulletedListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1280v-128h128v128H0zm0-384V768h128v128H0zm384 0V768h1664v128H384zM0 512V384h128v128H0zm384-128h1664v128H384V384zm0 896v-128h1664v128H384zM0 1664v-128h128v128H0zm384 0v-128h1664v128H384z" />
    </svg>
  ),
  displayName: 'BulletedListIcon',
});

export default BulletedListIcon;
