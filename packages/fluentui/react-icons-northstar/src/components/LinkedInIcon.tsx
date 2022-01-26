import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const LinkedInIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg
      role="presentation"
      focusable="false"
      viewBox="2 2 16 16"
      className={classes.svg}
      style={{ overflow: 'visible' }}
    >
      <rect x="2.08301" y="2.08301" width="15.8333" height="15.8333" rx="2" fill="#0077B5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.9797 5.57329C6.9797 4.79429 6.34485 4.16211 5.5645 4.16211C4.78069 4.16211 4.14844 4.79429 4.14844 5.57329C4.14844 6.35315 4.78069 6.98534 5.5645 6.98534C6.34485 6.98534 6.9797 6.35315 6.9797 5.57329ZM12.9989 7.86069C15.4707 7.86069 15.9271 9.48174 15.9271 11.5907V15.8856H13.4865L13.4857 11.8722C13.4774 11.0027 13.3781 10.0016 12.2185 10.0016C10.948 10.0016 10.754 10.9914 10.754 12.0131V15.8856H8.31678V8.05501H10.6561V9.12506H10.6899C11.0147 8.50929 11.8115 7.86069 12.9989 7.86069ZM6.78601 8.05508V15.8857H4.34276V8.05508H6.78601Z"
        fill="white"
      />
    </svg>
  ),
  displayName: 'LinkedInIcon',
});
