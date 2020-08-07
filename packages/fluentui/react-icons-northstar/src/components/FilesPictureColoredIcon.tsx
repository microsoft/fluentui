import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesPictureColoredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <path
        fill="#FFF"
        d="M4.5 28h23c.275 0 .5-.225.5-.5v-23c0-.275-.225-.5-.5-.5h-23c-.275 0-.5.225-.5.5v23c0 .275.225.5.5.5z"
      />
      <path
        fill="none"
        stroke="#A6CCC3"
        strokeMiterlimit="10"
        d="M18.939 17.358l-1.714 2.443-2.908-3.903a1 1 0 00-1.604 0L8.191 21.97c-.476.637-.008 1.53.801 1.53h14.016c.796 0 1.267-.868.818-1.508l-3.251-4.634a1 1 0 00-1.636 0z"
      />
      <circle fill="none" stroke="#FF9810" strokeMiterlimit="10" cx="21.5" cy="10.5" r="2" />
      <path
        opacity=".64"
        fill="#605E5C"
        d="M27.5 29h-23c-.827 0-1.5-.673-1.5-1.5v-23C3 3.673 3.673 3 4.5 3h23c.827 0 1.5.673 1.5 1.5v23c0 .827-.673 1.5-1.5 1.5zM4.5 4a.5.5 0 00-.5.5v23a.5.5 0 00.5.5h23a.5.5 0 00.5-.5v-23a.5.5 0 00-.5-.5h-23z"
      />
    </svg>
  ),
  displayName: 'FilesPictureColoredIcon',
});
