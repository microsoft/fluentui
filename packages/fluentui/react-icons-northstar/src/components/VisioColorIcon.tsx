import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const VisioColorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <path
        d="M9.5 29H28.5C28.7761 29 29 28.7761 29 28.5V9H24.5C23.6716 9 23 8.32843 23 7.5V3H9.5C9.22386 3 9 3.22386 9 3.5V28.5C9 28.7761 9.22386 29 9.5 29Z"
        fill="white"
      />
      <path d="M28.29 7.99996L24 3.70996V7.49996C24 7.7761 24.2239 7.99996 24.5 7.99996H28.29Z" fill="white" />
      <path
        opacity="0.64"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.56 7.85L24.15 2.44C23.8677 2.16045 23.4873 2.00251 23.09 2H9.5C8.67157 2 8 2.67157 8 3.5V28.5C8 29.3284 8.67157 30 9.5 30H28.5C29.3284 30 30 29.3284 30 28.5V8.91C29.9975 8.51274 29.8396 8.13226 29.56 7.85ZM24 3.71L28.29 8H24.5C24.2239 8 24 7.77614 24 7.5V3.71ZM9.5 29H28.5C28.7761 29 29 28.7761 29 28.5V9H24.5C23.6716 9 23 8.32843 23 7.5V3H9.5C9.22386 3 9 3.22386 9 3.5V28.5C9 28.7761 9.22386 29 9.5 29Z"
        fill="#605E5C"
      />
      <rect x="2" y="11" width="14" height="14" rx="1.5" fill="#185ABD" />
      <path
        d="M8.58 19.29C8.82 19.9567 8.96 20.3767 9 20.55C9 20.38 9.19 19.93 9.44 19.21L11.31 14H13L9.88 22H8.08L5 14H6.74L8.58 19.29Z"
        fill="white"
      />
      <path
        d="M22.5 22H19.5V21H22.5C22.7761 21 23 20.7761 23 20.5V17.5H24V20.5C24 21.3284 23.3284 22 22.5 22Z"
        fill="#185ABD"
      />
      <rect x="17" y="19" width="3" height="5" fill="#41A5EE" />
      <rect x="20.499" y="15.5029" width="4.24" height="4.24" transform="rotate(-45 20.499 15.5029)" fill="#103F91" />
    </svg>
  ),
  displayName: 'VisioColorIcon',
});
