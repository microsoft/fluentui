import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WeightsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1883 640l128 128-283 282-320-319-677 677 319 320-282 283-128-128-160 159-192-191q-10 9-20 21t-22 22-25 18-29 8q-26 0-45-19t-19-45q0-15 7-28t18-25 23-22 21-21L6 1568l159-160-128-128 283-282 320 319 677-677-319-320 282-283 128 128L1568 6l192 191q10-9 20-21t22-22 25-18 29-8q26 0 45 19t19 45q0 15-7 28t-18 25-23 22-21 21l191 192-159 160zM549 1792l-293-293-69 69 293 293 69-69zm321-64l-550-550-101 102 549 549 102-101zm629-1472l293 293 69-69-293-293-69 69zm330 512l-549-549-102 101 550 550 101-102z" />
    </svg>
  ),
  displayName: 'WeightsIcon',
});

export default WeightsIcon;
