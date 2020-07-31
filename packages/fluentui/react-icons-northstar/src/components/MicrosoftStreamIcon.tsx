import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const MicrosoftStreamIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M8 13.15v5.7L12 16l-4-2.85zM12 9v5.25L14.59 16 12 17.75V23l12-7-12-7z" />
      </g>
    </svg>
  ),
  displayName: 'MicrosoftStreamIcon',
});
