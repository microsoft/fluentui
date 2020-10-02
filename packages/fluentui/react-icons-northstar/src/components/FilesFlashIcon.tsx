import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesFlashIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" viewBox="0 0 32 32" className={classes.svg}>
      <path
        d="M6.5 29H25.5C25.775 29 26 28.775 26 28.5V9H21.5C20.673 9 20 8.327 20 7.5V3H6.5C6.225 3 6 3.225 6 3.5V28.5C6 28.775 6.225 29 6.5 29Z"
        fill="white"
      />
      <path d="M25.293 8.00003L21 3.70703V7.50003C21 7.77503 21.225 8.00003 21.5 8.00003H25.293Z" fill="white" />
      <path
        opacity="0.64"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.56 7.854L21.146 2.439C20.8642 2.15891 20.4833 2.00117 20.086 2H6.5C5.673 2 5 2.673 5 3.5V28.5C5 29.327 5.673 30 6.5 30H25.5C26.327 30 27 29.327 27 28.5V8.914C27 8.514 26.844 8.137 26.56 7.854ZM21 3.707L25.293 8H21.5C21.2241 7.99945 21.0005 7.77591 21 7.5V3.707ZM6.5 29H25.5C25.775 29 26 28.775 26 28.5V9H21.5C20.673 9 20 8.327 20 7.5V3H6.5C6.225 3 6 3.225 6 3.5V28.5C6.00055 28.7759 6.22409 28.9995 6.5 29Z"
        fill="#605E5C"
      />
    </svg>
  ),
  displayName: 'FilesFlashIcon',
});
