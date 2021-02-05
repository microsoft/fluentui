import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const TriangleEndIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="-2 -2 16 16" className={classes.svgFlippingInRtl}>
      <path d="M5.7016 3.28138C5.06943 2.65893 4 3.10677 4 3.99395V8.00596C4 8.89313 5.06944 9.34097 5.70161 8.71853L7.73895 6.71251C8.13681 6.32077 8.13681 5.67912 7.73895 5.28738L5.7016 3.28138Z" />
    </svg>
  ),
  displayName: 'TriangleEndIcon',
});
