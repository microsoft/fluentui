import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DislikeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 256q178 0 345 69 72 29 144 44t151 15h448v896h-417q-65 0-122 24t-104 70l-622 621q-25 25-50 39t-61 14q-33 0-62-12t-51-35-34-51-13-62q0-81 18-154t53-146q20-43 34-87t19-93H192q-39 0-74-15t-61-41-42-61-15-75q0-32 10-61l256-768q20-59 70-95t112-36h512z" />
    </svg>
  ),
  displayName: 'DislikeSolidIcon',
});

export default DislikeSolidIcon;
