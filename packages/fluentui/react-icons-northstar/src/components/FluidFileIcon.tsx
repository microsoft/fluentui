import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FluidFileIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg viewBox="0 0 32 32" role="presentation" className={classes.svg}>
      <path
        fill="#FFF"
        d="M4.5 28h23c.275 0 .5-.225.5-.5v-23c0-.275-.225-.5-.5-.5h-23c-.275 0-.5.225-.5.5v23c0 .275.225.5.5.5z"
      />
      <path
        opacity=".64"
        fill="#605E5C"
        d="M27.5 29h-23c-.827 0-1.5-.673-1.5-1.5v-23C3 3.673 3.673 3 4.5 3h23c.827 0 1.5.673 1.5 1.5v23c0 .827-.673 1.5-1.5 1.5zM4.5 4a.5.5 0 00-.5.5v23a.5.5 0 00.5.5h23a.5.5 0 00.5-.5v-23a.5.5 0 00-.5-.5h-23z"
      />
      <path
        fill="#949494"
        d="M21 11.5V14h1v-2.5c0-.825-.675-1.5-1.5-1.5H14v1h6.5c.271 0 .5.229.5.5zM14 21h-2.5a.507.507 0 01-.5-.5V14h-1v6.5c0 .825.675 1.5 1.5 1.5H14v-1zM12 9v3H9V9h3m0-1H9c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z"
      />
      <path
        fill="#1E8BCD"
        d="M22.5 24h-6c-.825 0-1.5-.675-1.5-1.5v-6c0-.825.675-1.5 1.5-1.5h6c.825 0 1.5.675 1.5 1.5v6c0 .825-.675 1.5-1.5 1.5z"
      />
    </svg>
  ),
  displayName: 'FluidFileIcon',
});
