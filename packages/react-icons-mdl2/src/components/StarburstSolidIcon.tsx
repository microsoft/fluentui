import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const StarburstSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024l-384 256 96 480-480-96-256 384-256-384-480 96 96-480L0 1024l384-256-96-480 480 96L1024 0l256 384 480-96-96 480 384 256z" />
    </svg>
  ),
  displayName: 'StarburstSolidIcon',
});

export default StarburstSolidIcon;
