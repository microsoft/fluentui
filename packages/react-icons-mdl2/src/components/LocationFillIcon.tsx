import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LocationFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 192q115 0 221 29t199 84 168 130 130 168 84 199 30 222q0 115-29 221t-84 199-130 168-168 130-199 84-222 30q-115 0-221-29t-199-84-168-130-130-168-84-199-30-222q0-115 29-221t84-199 130-168 168-130 199-84 222-30z" />
    </svg>
  ),
  displayName: 'LocationFillIcon',
});

export default LocationFillIcon;
