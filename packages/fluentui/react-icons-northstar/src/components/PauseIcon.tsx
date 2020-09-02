import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const PauseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <g>
        <path d="M12.5 22V10h1v12h-1zM18.5 22V10h1v12h-1z" />
      </g>
    </svg>
  ),
  displayName: 'PauseIcon',
});
