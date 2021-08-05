import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ViewDashboardIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v2048H0V0h2048zm-128 128h-640v512h640V128zm-640 1152h640V768h-640v512zM128 128v1152h1024V128H128zm0 1792h640v-512H128v512zm1792 0v-512H896v512h1024z" />
    </svg>
  ),
  displayName: 'ViewDashboardIcon',
});

export default ViewDashboardIcon;
