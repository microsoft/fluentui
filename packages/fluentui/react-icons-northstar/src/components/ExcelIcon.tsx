import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ExcelIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <path fill="#21a366" d="M20 2H9.333A1.333 1.333 0 0 0 8 3.333V9l12 7 6 2.532L32 16V9z" />
      <path fill="#107c41" d="M8 9h12v7H8z" />
      <path fill="#33c481" d="M30.667 2H20v7h12V3.333A1.333 1.333 0 0 0 30.667 2z" />
      <path fill="#185c37" d="M20 16H8v12.667A1.333 1.333 0 0 0 9.333 30h21.334A1.333 1.333 0 0 0 32 28.667V23z" />
      <path fill="#107c41" d="M20 16h12v7H20z" />
      <path d="M16.667 7H8v19h8.667A1.337 1.337 0 0 0 18 24.667V8.333A1.337 1.337 0 0 0 16.667 7z" opacity=".1" />
      <path d="M15.667 8H8v19h7.667A1.337 1.337 0 0 0 17 25.667V9.333A1.337 1.337 0 0 0 15.667 8z" opacity=".2" />
      <path d="M15.667 8H8v17h7.667A1.337 1.337 0 0 0 17 23.667V9.333A1.337 1.337 0 0 0 15.667 8z" opacity=".2" />
      <path d="M14.667 8H8v17h6.667A1.337 1.337 0 0 0 16 23.667V9.333A1.337 1.337 0 0 0 14.667 8z" opacity=".2" />
      <path
        fill="#107c41"
        d="M1.333 8h13.334A1.333 1.333 0 0 1 16 9.333v13.334A1.333 1.333 0 0 1 14.667 24H1.333A1.333 1.333 0 0 1 0 22.667V9.333A1.333 1.333 0 0 1 1.333 8z"
      />
      <path
        fill="#fff"
        d="M3.533 21l3.236-5.014L3.805 11H6.19l1.618 3.187q.223.453.307.676h.021q.16-.362.335-.704L10.2 11h2.189l-3.04 4.958L12.466 21h-2.33l-1.869-3.5a2.922 2.922 0 0 1-.223-.468h-.028a2.207 2.207 0 0 1-.216.453L5.877 21z"
      />
      <path fill="none" d="M0 0h32v32H0z" />
    </svg>
  ),
  displayName: 'ExcelIcon',
});
