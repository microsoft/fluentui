import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MapPinSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 2048H0L384 896h512V634q-56-12-103-41t-81-70-53-94-19-109q0-66 25-124t68-101 102-69T960 0q66 0 124 25t101 69 69 102 26 124q0 57-19 109t-53 93-81 71-103 41v262h512l384 1152zM768 320q0 40 15 75t41 61 61 41 75 15q40 0 75-15t61-41 41-61 15-75q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75zm256 704H896v480q0 9 7 15t18 10 21 5 18 2q7 0 17-1t21-5 18-10 8-16v-480z" />
    </svg>
  ),
  displayName: 'MapPinSolidIcon',
});

export default MapPinSolidIcon;
