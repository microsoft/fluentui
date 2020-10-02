import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesVideoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" viewBox="0 0 32 32" className={classes.svg} fill="none">
      <path
        d="M4.5 28H27.5C27.775 28 28 27.775 28 27.5V4.5C28 4.225 27.775 4 27.5 4H4.5C4.225 4 4 4.225 4 4.5V27.5C4 27.775 4.225 28 4.5 28Z"
        fill="white"
      />
      <path
        opacity="0.64"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 29H27.5C28.327 29 29 28.327 29 27.5V4.5C29 3.673 28.327 3 27.5 3H4.5C3.673 3 3 3.673 3 4.5V27.5C3 28.327 3.673 29 4.5 29ZM4 4.5C4 4.22386 4.22386 4 4.5 4H27.5C27.7761 4 28 4.22386 28 4.5V27.5C28 27.7761 27.7761 28 27.5 28H4.5C4.22386 28 4 27.7761 4 27.5V4.5Z"
        fill="#605E5C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.5 16L13.5 11V21L21.5 16Z"
        stroke="#69AFE5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  displayName: 'FilesVideoIcon',
});
