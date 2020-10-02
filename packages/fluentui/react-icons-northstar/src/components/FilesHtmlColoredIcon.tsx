import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesHtmlColoredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" viewBox="0 0 32 32" fill="none" className={classes.svg}>
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 24H23.5C23.7761 24 24 23.7761 24 23.5C24 23.2239 23.7761 23 23.5 23H8.5C8.22386 23 8 23.2239 8 23.5C8 23.7761 8.22386 24 8.5 24ZM8.5 26H23.5C23.7761 26 24 25.7761 24 25.5C24 25.2239 23.7761 25 23.5 25H8.5C8.22386 25 8 25.2239 8 25.5C8 25.7761 8.22386 26 8.5 26Z"
        fill="#C8C6C4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 20.5C18.4853 20.5 20.5 18.4853 20.5 16C20.5 13.5147 18.4853 11.5 16 11.5C13.5147 11.5 11.5 13.5147 11.5 16C11.5 18.4853 13.5147 20.5 16 20.5Z"
        stroke="#69AFE5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 20.5C16.8284 20.5 17.5 18.4853 17.5 16C17.5 13.5147 16.8284 11.5 16 11.5C15.1716 11.5 14.5 13.5147 14.5 16C14.5 18.4853 15.1716 20.5 16 20.5Z"
        stroke="#69AFE5"
      />
      <path d="M12 15H20V14H12V15ZM12 18H20V17H12V18Z" fill="#69AFE5" />
    </svg>
  ),
  displayName: 'FilesHtmlColoredIcon',
});
