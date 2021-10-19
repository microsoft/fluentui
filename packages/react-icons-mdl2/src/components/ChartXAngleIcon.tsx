import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ChartXAngleIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M384 347v1571q75-6 151-25t148-51 135-76 115-102H640v-128h512v512h-128v-293l-19 18q-143 137-315 206t-370 69h-64V37l1645 1646-90 90L384 347z" />
    </svg>
  ),
  displayName: 'ChartXAngleIcon',
});

export default ChartXAngleIcon;
