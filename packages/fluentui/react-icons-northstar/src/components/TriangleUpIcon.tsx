import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const TriangleUpIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="-2 -2 16 16" className={classes.svg}>
      <path d="M3.07615 7.38268C3.23093 7.75636 3.59557 8 4.00003 8H8.00003C8.40449 8 8.76913 7.75636 8.92391 7.38268C9.07869 7.00901 8.99313 6.57889 8.70714 6.29289L6.70714 4.29289C6.31661 3.90237 5.68345 3.90237 5.29292 4.29289L3.29292 6.29289C3.00692 6.57889 2.92137 7.00901 3.07615 7.38268Z" />
    </svg>
  ),
  displayName: 'TriangleUpIcon',
});
