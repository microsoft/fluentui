import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const WordIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 28 28" className={classes.svg}>
      <path d="M26 9V4C26 3.448 25.552 3 25 3H9C8.448 3 8 3.448 8 4V9L17 11L26 9Z" fill="#41A5EE" />
      <path d="M26 9H8V14L17.5 16L26 14V9Z" fill="#2B7CD3" />
      <path d="M26 14H8V19L17 20.5L26 19V14Z" fill="#185ABD" />
      <path d="M26 19H8V23.958C8 24.51 8.448 24.958 9 24.958H25C25.552 24.958 26 24.51 26 23.958V19Z" fill="#103F91" />
      <path
        opacity="0.5"
        d="M15.8332 8H8.00024V22H15.6042C16.3122 22 17.0002 21.288 17.0002 20.646V9.167C17.0002 8.525 16.4752 8 15.8332 8Z"
        fill="black"
      />
      <path
        d="M14.8335 21H3.16649C2.52549 21 2.00049 20.475 2.00049 19.833V8.167C2.00049 7.525 2.52549 7 3.16649 7H14.8335C15.4755 7 16.0005 7.525 16.0005 8.167V19.833C16.0005 20.475 15.4755 21 14.8335 21Z"
        fill="#185ABD"
      />
      <path
        d="M12.16 18H10.72L9.03999 12.48L7.27999 18H5.83999L4.23999 10H5.67999L6.79999 15.6L8.47999 10.16H9.67999L11.28 15.6L12.4 10H13.76L12.16 18Z"
        fill="white"
      />
    </svg>
  ),
  displayName: 'WordIcon',
});
