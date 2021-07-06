import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ThreeQuarterCircleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 896q0 59-3 114t-11 109-23 107-38 108q-57 134-148 242t-206 184-251 118-280 42q-133 0-255-34t-230-96-194-150-150-195-97-229T0 960q0-133 34-255t96-230 150-194 195-150 229-97T960 0h64v896h896zm-960 896q108 0 209-27t191-76 165-119 132-155 90-184 43-207H896V130q-108 8-207 42t-184 91-155 131-119 165-76 191-27 210q0 115 30 221t84 198 130 169 168 130 199 84 221 30z" />
    </svg>
  ),
  displayName: 'ThreeQuarterCircleIcon',
});

export default ThreeQuarterCircleIcon;
