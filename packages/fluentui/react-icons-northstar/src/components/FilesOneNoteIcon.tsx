import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesOneNoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 16 16" className={classes.svg}>
      <path
        opacity="0.64"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 16H13.5C14.327 16 15 15.327 15 14.5V6C15.5523 6 16 5.55228 16 5V2C16 1.44772 15.5523 1 15 1H14.914C14.708 0.418 14.152 0 13.5 0H5.5C4.673 0 4 0.673 4 1.5V14.5C4 15.327 4.673 16 5.5 16ZM5 1.5C5 1.22386 5.22386 1 5.5 1H13.5C13.7761 1 14 1.22386 14 1.5V2H15V5H14V14.5C14 14.7761 13.7761 15 13.5 15H5.5C5.22386 15 5 14.7761 5 14.5V1.5Z"
        fill="#605E5C"
      />
      <path
        d="M15 2H14V1.5C14 1.22386 13.7761 1 13.5 1H5.5C5.22386 1 5 1.22386 5 1.5V14.5C5 14.7761 5.22386 15 5.5 15H13.5C13.7761 15 14 14.7761 14 14.5V5H15V2Z"
        fill="white"
      />
      <path
        d="M1 13H8C8.55229 13 9 12.5523 9 12V5C9 4.44772 8.55229 4 8 4H1C0.447715 4 0 4.44772 0 5V12C0 12.5523 0.447715 13 1 13Z"
        fill="#7719AA"
      />
      <path d="M2.41699 10.8959V6.44288H2.50199L6.48299 10.4319L6.54199 10.4309V6.05688" stroke="white" />
    </svg>
  ),
  displayName: 'FilesOneNoteIcon',
});
