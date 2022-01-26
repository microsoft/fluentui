import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BulletedListBulletIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 1664v-128h128v128H0zm0-384v-128h128v128H0zm0-896h128v128H0V384zm0 512V768h128v128H0z" />
    </svg>
  ),
  displayName: 'BulletedListBulletIcon',
});

export default BulletedListBulletIcon;
