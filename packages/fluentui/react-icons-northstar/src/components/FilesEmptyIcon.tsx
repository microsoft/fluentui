import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesEmptyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 20 20" className={classes.svg}>
      <path d="M16 7H13.5C12.673 7 12 6.327 12 5.5V2H4V18H16V7Z" fill="white" />
      <path d="M16 6.00003V5.70703L13 2.70703V5.50003C13 5.77503 13.225 6.00003 13.5 6.00003H16Z" fill="white" />
      <path
        opacity="0.64"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.707 5L13 1.293C12.8125 1.10545 12.5582 1.00006 12.293 1H4C3.44772 1 3 1.44772 3 2V18C3 18.5523 3.44772 19 4 19H16C16.5523 19 17 18.5523 17 18V5.707C16.9999 5.4418 16.8945 5.18749 16.707 5ZM16 5.707V6H13.5C13.2241 5.99945 13.0006 5.77591 13 5.5V2.707L16 5.707ZM4 2.2V17.8C4 17.9105 4.08954 18 4.2 18H15.8C15.9105 18 16 17.9105 16 17.8V7H13.5C12.6716 7 12 6.32843 12 5.5V2H4.2C4.09 2 4 2.09 4 2.2Z"
        fill="#605E5C"
      />
    </svg>
  ),
  displayName: 'FilesEmptyIcon',
});
