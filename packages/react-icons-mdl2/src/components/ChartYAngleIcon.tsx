import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChartYAngleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024h-293l18 19q137 143 206 315t69 370v64H37L1683 147l90 90L347 1664h1571q-6-75-25-151t-51-148-76-135-102-115v293h-128V896h512v128z" />
    </svg>
  ),
  displayName: 'ChartYAngleIcon',
});

export default ChartYAngleIcon;
