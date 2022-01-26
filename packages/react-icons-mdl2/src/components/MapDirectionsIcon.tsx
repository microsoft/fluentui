import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MapDirectionsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 0l1024 1024-1024 1024L0 1024 1024 0zM768 1611l256 256 843-843-843-843-843 843 459 459V896h549L979 685l90-90 365 365-365 365-90-90 210-211H768v587z" />
    </svg>
  ),
  displayName: 'MapDirectionsIcon',
});

export default MapDirectionsIcon;
