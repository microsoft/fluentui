import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesPictureColoredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 20 20" className={classes.svg}>
      <path
        d="M3.5 17H16.5C16.775 17 17 16.775 17 16.5V3.5C17 3.225 16.775 3 16.5 3H3.5C3.225 3 3 3.225 3 3.5V16.5C3 16.775 3.225 17 3.5 17Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6912 10.657L10.8132 11.943L9.12618 9.61698C8.93807 9.35762 8.63707 9.2041 8.31668 9.2041C7.99628 9.2041 7.69529 9.35762 7.50718 9.61698L5.11718 12.913C4.8965 13.2173 4.86517 13.6197 5.03607 13.9546C5.20697 14.2894 5.55124 14.5001 5.92718 14.5H14.0732C14.444 14.5001 14.7845 14.2949 14.9577 13.967C15.1308 13.6391 15.1083 13.2422 14.8992 12.936L13.3432 10.656C13.1569 10.383 12.8477 10.2197 12.5172 10.2197C12.1867 10.2197 11.8775 10.383 11.6912 10.656V10.657Z"
        stroke="#A6CCC3"
        fill="none"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5 7.5C14.0523 7.5 14.5 7.05228 14.5 6.5C14.5 5.94772 14.0523 5.5 13.5 5.5C12.9477 5.5 12.5 5.94772 12.5 6.5C12.5 7.05228 12.9477 7.5 13.5 7.5Z"
        stroke="#FF9810"
        fill="none"
      />
      <path
        opacity="0.64"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 18H16.5C17.327 18 18 17.327 18 16.5V3.5C18 2.673 17.327 2 16.5 2H3.5C2.673 2 2 2.673 2 3.5V16.5C2 17.327 2.673 18 3.5 18ZM3 3.5C3 3.22386 3.22386 3 3.5 3H16.5C16.7761 3 17 3.22386 17 3.5V16.5C17 16.7761 16.7761 17 16.5 17H3.5C3.22386 17 3 16.7761 3 16.5V3.5Z"
        fill="#605E5C"
      />
    </svg>
  ),
  displayName: 'FilesPictureColoredIcon',
});
