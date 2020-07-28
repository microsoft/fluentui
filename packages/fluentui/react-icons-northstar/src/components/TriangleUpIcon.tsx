import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const TriangleUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M16 13l3.5 4h-7z" />
    </svg>
  ),
  displayName: 'TriangleUpIcon',
});
