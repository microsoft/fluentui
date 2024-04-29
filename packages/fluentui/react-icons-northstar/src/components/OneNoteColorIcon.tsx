import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const OneNoteColorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <path
        opacity="0.64"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 30H26.5C27.327 30 28 29.327 28 28.5V3.5C28 2.673 27.327 2 26.5 2H9.5C8.673 2 8 2.673 8 3.5V28.5C8 29.327 8.673 30 9.5 30ZM9 3.5C9 3.22386 9.22386 3 9.5 3H26.5C26.7761 3 27 3.22386 27 3.5V28.5C27 28.7761 26.7761 29 26.5 29H9.5C9.22386 29 9 28.7761 9 28.5V3.5Z"
        fill="#605E5C"
      />
      <path d="M29 19H28V13H29C29.5523 13 30 13.4477 30 14V18C30 18.5523 29.5523 19 29 19Z" fill="#9332BF" />
      <path d="M29 12H28V6H29C29.5523 6 30 6.44772 30 7V11C30 11.5523 29.5523 12 29 12Z" fill="#AE4BD5" />
      <path d="M29 26H28V20H29C29.5523 20 30 20.4477 30 21V25C30 25.5523 29.5523 26 29 26Z" fill="#7719AA" />
      <path
        d="M9.5 29H26.5C26.7761 29 27 28.7761 27 28.5V3.5C27 3.22386 26.7761 3 26.5 3H9.5C9.22386 3 9 3.22386 9 3.5V28.5C9 28.7761 9.22386 29 9.5 29Z"
        fill="white"
      />
      <path
        d="M3.5 25H14.5C15.3284 25 16 24.3284 16 23.5V12.5C16 11.6716 15.3284 11 14.5 11H3.5C2.67157 11 2 11.6716 2 12.5V23.5C2 24.3284 2.67157 25 3.5 25Z"
        fill="#7719AA"
      />
      <path
        d="M12.542 22H10.726C10.726 22 7.07301 16.464 7.00001 16.316V22H5.31201V14H7.37201L11.035 19.684C11.005 19.493 11.022 14.012 11.022 14.012L12.542 14V22Z"
        fill="white"
      />
    </svg>
  ),
  displayName: 'OneNoteColorIcon',
});
