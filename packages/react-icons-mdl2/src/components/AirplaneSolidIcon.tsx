import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AirplaneSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1856 768q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15h-544l-384 768H662l256-768H256l-67 128H0l108-320L0 640h189l67 128h662L662 0h266l384 768h544z" />
    </svg>
  ),
  displayName: 'AirplaneSolidIcon',
});

export default AirplaneSolidIcon;
