import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const TriangleEndIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svgFlippingInRtl}>
      <path d="M19 16l-4-3.5v7z" />
    </svg>
  ),
  displayName: 'TriangleEndIcon',
});
