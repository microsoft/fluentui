import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const GeofenceArrivesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 18 16" className={classes.svg}>
      <path
        d="M22.5,15H13.678l.878-.91a.5.5,0,1,0-.719-.7l-1.7,1.758a.5.5,0,0,0,0,.694l1.7,1.758a.5.5,0,1,0,.719-.7L13.678,16H22.5a.5.5,0,0,0,0-1Z"
        fillRule="evenodd"
      />
      <path
        d="M18.344,17.049a.53.53,0,0,0-.7.265,4.44,4.44,0,1,1-.009-3.648.53.53,0,1,0,.963-.442,5.5,5.5,0,1,0,.012,4.527A.531.531,0,0,0,18.344,17.049Z"
        fillRule="evenodd"
      />
    </svg>
  ),
  displayName: 'GeofenceArrivesIcon',
});
