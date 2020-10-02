import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesSoundIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg} fill="none">
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
        d="M13 20.5C13.8284 20.5 14.5 19.8284 14.5 19C14.5 18.1716 13.8284 17.5 13 17.5C12.1716 17.5 11.5 18.1716 11.5 19C11.5 19.8284 12.1716 20.5 13 20.5Z"
        stroke="#69AFE5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 19.5C19.8284 19.5 20.5 18.8284 20.5 18C20.5 17.1716 19.8284 16.5 19 16.5C18.1716 16.5 17.5 17.1716 17.5 18C17.5 18.8284 18.1716 19.5 19 19.5Z"
        stroke="#69AFE5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 11.5H21C21 11.353 20.9353 11.2135 20.8232 11.1185C20.711 11.0235 20.5628 10.9826 20.4178 11.0068L20.5 11.5ZM14.5 12.5L14.4178 12.0068C14.1767 12.047 14 12.2556 14 12.5H14.5ZM21 18V11.5H20V18H21ZM20.4178 11.0068L14.4178 12.0068L14.5822 12.9932L20.5822 11.9932L20.4178 11.0068ZM14 12.5V19H15V12.5H14ZM20.4178 13.0068L14.4178 14.0068L14.5822 14.9932L20.5822 13.9932L20.4178 13.0068Z"
        fill="#69AFE5"
      />
    </svg>
  ),
  displayName: 'FilesSoundIcon',
});
