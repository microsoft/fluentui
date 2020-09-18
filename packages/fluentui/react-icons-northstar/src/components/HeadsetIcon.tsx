import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const HeadsetIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M21 14.092V14c0-2.757-2.243-5-5-5s-5 2.243-5 5v.092c-.58.207-1 .757-1 1.408v2c0 .651.42 1.2 1 1.408v1.873c0 1.46 1.406 1.678 3.09 1.71A1.498 1.498 0 0 0 15.5 23.5h.5c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.5-1.5h-.5c-.647 0-1.194.414-1.405.99C12.462 21.447 12 21.27 12 20.78V19h.5a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5H12c0-2.206 1.794-4 4-4s4 1.794 4 4h-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1c.827 0 1.5-.673 1.5-1.5v-2c0-.651-.42-1.2-1-1.408zM15.5 21.5h.5a.5.5 0 0 1 0 1h-.5a.5.5 0 0 1 0-1zM12 18h-.5a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h.5v3zm9-.5c0 .275-.225.5-.5.5H20v-3h.5a.5.5 0 0 1 .5.5v2z" />
      </g>
    </svg>
  ),
  displayName: 'HeadsetIcon',
});
