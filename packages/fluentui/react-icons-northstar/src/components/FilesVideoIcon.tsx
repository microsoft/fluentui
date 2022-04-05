import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesVideoIcon = createSvgIcon({
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
        d="M12.5 10L8.5 7.5V12.5L12.5 10Z"
        stroke="#69AFE5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  displayName: 'FilesVideoIcon',
});
