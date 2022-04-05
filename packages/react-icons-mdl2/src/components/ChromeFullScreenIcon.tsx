import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChromeFullScreenIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v819h-205V350L350 1843h469v205H0v-819h205v469L1698 205h-469V0h819z" />
    </svg>
  ),
  displayName: 'ChromeFullScreenIcon',
});

export default ChromeFullScreenIcon;
