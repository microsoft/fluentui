import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MapLayersIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 832l384 192-384 192 384 192-1024 512L0 1408l384-192L0 1024l384-192L0 640l1024-512 1024 512-384 192zM286 640l738 369 738-369-738-369-738 369zm1476 768l-241-120-497 248-497-248-241 120 738 369 738-369zm-738-15l738-369-241-120-497 248-497-248-241 120 738 369z" />
    </svg>
  ),
  displayName: 'MapLayersIcon',
});

export default MapLayersIcon;
