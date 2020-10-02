import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesPictureColoredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" viewBox="0 0 32 32" className={classes.svg} fill="none">
      <path
        d="M4.5 28H27.5C27.775 28 28 27.775 28 27.5V4.5C28 4.225 27.775 4 27.5 4H4.5C4.225 4 4 4.225 4 4.5V27.5C4 27.775 4.225 28 4.5 28Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.9391 17.3578L17.2251 19.8008L14.3171 15.8978C14.1284 15.6444 13.831 15.4951 13.5151 15.4951C13.1991 15.4951 12.9018 15.6444 12.7131 15.8978L8.19108 21.9698C7.71508 22.6068 8.18308 23.4998 8.99208 23.4998H23.0081C23.8041 23.4998 24.2751 22.6318 23.8261 21.9918L20.5751 17.3578C20.3878 17.0915 20.0826 16.933 19.7571 16.933C19.4315 16.933 19.1263 17.0915 18.9391 17.3578V17.3578Z"
        stroke="#A6CCC3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.5 12.5C22.6046 12.5 23.5 11.6046 23.5 10.5C23.5 9.39543 22.6046 8.5 21.5 8.5C20.3954 8.5 19.5 9.39543 19.5 10.5C19.5 11.6046 20.3954 12.5 21.5 12.5Z"
        stroke="#FF9810"
      />
      <path
        opacity="0.64"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.5 29H27.5C28.327 29 29 28.327 29 27.5V4.5C29 3.673 28.327 3 27.5 3H4.5C3.673 3 3 3.673 3 4.5V27.5C3 28.327 3.673 29 4.5 29ZM4 4.5C4 4.22386 4.22386 4 4.5 4H27.5C27.7761 4 28 4.22386 28 4.5V27.5C28 27.7761 27.7761 28 27.5 28H4.5C4.22386 28 4 27.7761 4 27.5V4.5Z"
        fill="#605E5C"
      />
    </svg>
  ),
  displayName: 'FilesPictureColoredIcon',
});
