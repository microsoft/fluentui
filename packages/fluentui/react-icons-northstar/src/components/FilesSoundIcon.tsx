import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesSoundIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 20 20" className={classes.svg}>
      <path
        d="M3.5 17H16.5C16.775 17 17 16.775 17 16.5V3.5C17 3.225 16.775 3 16.5 3H3.5C3.225 3 3 3.225 3 3.5V16.5C3 16.775 3.225 17 3.5 17Z"
        fill="white"
      />
      <path
        opacity="0.64"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 18H16.5C17.327 18 18 17.327 18 16.5V3.5C18 2.673 17.327 2 16.5 2H3.5C2.673 2 2 2.673 2 3.5V16.5C2 17.327 2.673 18 3.5 18ZM3 3.5C3 3.22386 3.22386 3 3.5 3H16.5C16.7761 3 17 3.22386 17 3.5V16.5C17 16.7761 16.7761 17 16.5 17H3.5C3.22386 17 3 16.7761 3 16.5V3.5Z"
        fill="#605E5C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 13.5C8.05228 13.5 8.5 13.0523 8.5 12.5C8.5 11.9477 8.05228 11.5 7.5 11.5C6.94772 11.5 6.5 11.9477 6.5 12.5C6.5 13.0523 6.94772 13.5 7.5 13.5Z"
        stroke="#69AFE5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 12.5C13.0523 12.5 13.5 12.0523 13.5 11.5C13.5 10.9477 13.0523 10.5 12.5 10.5C11.9477 10.5 11.5 10.9477 11.5 11.5C11.5 12.0523 11.9477 12.5 12.5 12.5Z"
        stroke="#69AFE5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M13.5 6.5H14C14 6.3502 13.9328 6.2083 13.817 6.11333C13.7012 6.01836 13.5488 5.98033 13.4019 6.00971L13.5 6.5ZM8.5 7.5L8.40194 7.00971C8.16823 7.05645 8 7.26166 8 7.5H8.5ZM14 11.5V6.5H13V11.5H14ZM13.4019 6.00971L8.40194 7.00971L8.59806 7.99029L13.5981 6.99029L13.4019 6.00971ZM8 7.5V12.5H9V7.5H8ZM13.4019 7.50971L8.40194 8.50971L8.59806 9.49029L13.5981 8.49029L13.4019 7.50971Z"
        fill="#69AFE5"
      />
    </svg>
  ),
  displayName: 'FilesSoundIcon',
});
