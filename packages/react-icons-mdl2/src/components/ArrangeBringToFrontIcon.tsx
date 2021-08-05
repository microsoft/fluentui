import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ArrangeBringToFrontIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1664H384V384h1280v1280zM1536 512H512v1024h1024V512zM128 768h128v128H0V0h896v256H768V128H128v640zm1920 384v896h-896v-256h128v128h640v-640h-128v-128h256z" />
    </svg>
  ),
  displayName: 'ArrangeBringToFrontIcon',
});

export default ArrangeBringToFrontIcon;
