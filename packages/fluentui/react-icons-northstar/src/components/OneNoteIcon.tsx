import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const OneNoteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <path
        fill="#ca64ea"
        d="M9.333 2h21.334A1.333 1.333 0 0 1 32 3.333v25.334A1.333 1.333 0 0 1 30.667 30H9.333A1.333 1.333 0 0 1 8 28.667V3.333A1.333 1.333 0 0 1 9.333 2z"
      />
      <path
        fill="#ca64ea"
        d="M32 3.333A1.333 1.333 0 0 0 30.666 2H9.334A1.333 1.333 0 0 0 8 3.333v25.334A1.333 1.333 0 0 0 9.333 30H25l7-21z"
      />
      <path fill="#ae4bd5" d="M32 9h-7v7l3.5 3.195L32 16V9z" />
      <path fill="#9332bf" d="M32 16h-7v7l3.5 3.395L32 23v-7z" />
      <path fill="#7719aa" d="M25 23h7v5.667A1.333 1.333 0 0 1 30.667 30H25v-7z" />
      <path d="M16.667 7H8v19h8.667A1.337 1.337 0 0 0 18 24.667V8.333A1.337 1.337 0 0 0 16.667 7z" opacity=".1" />
      <path d="M15.667 8H8v19h7.667A1.337 1.337 0 0 0 17 25.667V9.333A1.337 1.337 0 0 0 15.667 8z" opacity=".2" />
      <path d="M15.667 8H8v17h7.667A1.337 1.337 0 0 0 17 23.667V9.333A1.337 1.337 0 0 0 15.667 8z" opacity=".3" />
      <path d="M14.667 8H8v17h6.667A1.337 1.337 0 0 0 16 23.667V9.333A1.337 1.337 0 0 0 14.667 8z" opacity=".2" />
      <path
        fill="#7719aa"
        d="M1.333 8h13.334A1.333 1.333 0 0 1 16 9.333v13.334A1.333 1.333 0 0 1 14.667 24H1.333A1.333 1.333 0 0 1 0 22.667V9.333A1.333 1.333 0 0 1 1.333 8z"
      />
      <path
        fill="#fff"
        d="M4.001 11h2.13l3.656 6.732q.286.435.43.7h.026a9.493 9.493 0 0 1-.06-1.326V11h1.816v10h-1.994l-3.813-6.63a5.133 5.133 0 0 1-.388-.686H5.77a13.628 13.628 0 0 1 .055 1.456V21H4z"
      />
      <path fill="none" d="M0 0h32v32H0z" />
    </svg>
  ),
  displayName: 'OneNoteIcon',
});
