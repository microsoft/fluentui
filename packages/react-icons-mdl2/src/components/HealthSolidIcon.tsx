import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HealthSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1504 128q113 0 212 42t172 116 116 173 43 212q0 58-12 115t-36 110h-463l-192-200-320 320-448-448-320 328H49q-24-53-36-110T1 671q0-113 42-212t116-172 173-116 212-43q109 0 208 41t177 118l95 96 95-96q77-77 176-118t209-41zm-96 896h510l-14 16q-7 8-15 17l-865 864-865-864q-8-8-15-16t-14-17h254l192-184 448 448 320-320 64 56z" />
    </svg>
  ),
  displayName: 'HealthSolidIcon',
});

export default HealthSolidIcon;
