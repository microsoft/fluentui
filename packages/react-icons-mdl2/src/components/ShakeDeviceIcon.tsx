import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShakeDeviceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1897 1527q0 34-18 63t-49 45l-804 400q-13 6-26 9t-27 4q-35 0-63-17t-45-50L164 574q-13-28-13-53 0-34 18-63t49-45l804-400q28-13 53-13 35 0 64 18t44 49l701 1407q13 28 13 53zm-921 390l790-393-694-1393-790 393 694 1393zm427-383l-201 100-57-115 201-100 57 115zm261-1187l-83 82-90-90 237-237 237 237-90 90-83-82v293h-128V347zM384 1701l83-82 90 90-237 237-237-237 90-90 83 82v-293h128v293z" />
    </svg>
  ),
  displayName: 'ShakeDeviceIcon',
});

export default ShakeDeviceIcon;
