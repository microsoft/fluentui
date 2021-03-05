import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const TriangleDownIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="-2 -2 16 16" className={classes.svg}>
      <path d="M3.07615 4.61732C3.23093 4.24364 3.59557 4 4.00003 4H8.00003C8.40449 4 8.76913 4.24364 8.92391 4.61732C9.07869 4.99099 8.99313 5.42111 8.70714 5.70711L6.70714 7.70711C6.31661 8.09763 5.68345 8.09763 5.29292 7.70711L3.29292 5.70711C3.00692 5.42111 2.92137 4.99099 3.07615 4.61732Z" />
    </svg>
  ),
  displayName: 'TriangleDownIcon',
});
