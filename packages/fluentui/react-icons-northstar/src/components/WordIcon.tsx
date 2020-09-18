import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const WordIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <path
        fill="#41a5ee"
        d="M30.667 2H9.333A1.333 1.333 0 0 0 8 3.333V9l12 3.5L32 9V3.333A1.333 1.333 0 0 0 30.667 2z"
      />
      <path fill="#2b7cd3" d="M32 9H8v7l12 3.5L32 16V9z" />
      <path fill="#185abd" d="M32 16H8v7l12 3.5L32 23v-7z" />
      <path fill="#103f91" d="M32 23H8v5.667A1.333 1.333 0 0 0 9.333 30h21.334A1.333 1.333 0 0 0 32 28.667z" />
      <path d="M16.667 7H8v19h8.667A1.337 1.337 0 0 0 18 24.667V8.333A1.337 1.337 0 0 0 16.667 7z" opacity=".1" />
      <path d="M15.667 8H8v19h7.667A1.337 1.337 0 0 0 17 25.667V9.333A1.337 1.337 0 0 0 15.667 8z" opacity=".2" />
      <path d="M15.667 8H8v17h7.667A1.337 1.337 0 0 0 17 23.667V9.333A1.337 1.337 0 0 0 15.667 8z" opacity=".2" />
      <path d="M14.667 8H8v17h6.667A1.337 1.337 0 0 0 16 23.667V9.333A1.337 1.337 0 0 0 14.667 8z" opacity=".2" />
      <path
        fill="#185abd"
        d="M1.333 8h13.334A1.333 1.333 0 0 1 16 9.333v13.334A1.333 1.333 0 0 1 14.667 24H1.333A1.333 1.333 0 0 1 0 22.667V9.333A1.333 1.333 0 0 1 1.333 8z"
      />
      <path fill="#fff" d="M11.95 21h-1.8l-2.1-6.9-2.2 6.9h-1.8l-2-10h1.8l1.4 7 2.1-6.8h1.5l2 6.8 1.4-7h1.7z" />
      <path fill="none" d="M0 0h32v32H0z" />
    </svg>
  ),
  displayName: 'WordIcon',
});
