import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HistoricalWeatherIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1664h1920v128H0V256h128v441l525-263 340 340 459 115 487-486 90 90-537 538-565-141-300-300-499 249v297l520-115 519 259h354l434-217 58 114-462 231h-414l-505-253-504 112v397z" />
    </svg>
  ),
  displayName: 'HistoricalWeatherIcon',
});

export default HistoricalWeatherIcon;
