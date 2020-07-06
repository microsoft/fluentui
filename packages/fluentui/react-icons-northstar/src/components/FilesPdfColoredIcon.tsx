import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const FilesPdfColoredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="0 0 32 32" className={classes.svg}>
      <path
        fill="#FFF"
        d="M6.5 29h19c.275 0 .5-.225.5-.5V9h-4.5c-.827 0-1.5-.673-1.5-1.5V3H6.5c-.275 0-.5.225-.5.5v25c0 .275.225.5.5.5z"
      />
      <path fill="#FFF" d="M25.293 8L21 3.707V7.5c0 .275.225.5.5.5h3.793z" />
      <path
        opacity=".64"
        fill="#605E5C"
        d="M26.56 7.854l-5.414-5.415A1.51 1.51 0 0020.086 2H6.5C5.673 2 5 2.673 5 3.5v25c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5V8.914c0-.4-.156-.777-.44-1.06zM21 3.707L25.293 8H21.5a.501.501 0 01-.5-.5V3.707zM25.5 29h-19a.501.501 0 01-.5-.5v-25c0-.275.225-.5.5-.5H20v4.5c0 .827.673 1.5 1.5 1.5H26v19.5c0 .275-.225.5-.5.5z"
      />
      <path
        fill="#C8C6C4"
        d="M23.5 13h-15a.5.5 0 010-1h15a.5.5 0 010 1zm0 2h-15a.5.5 0 010-1h15a.5.5 0 010 1zm0 2h-15a.5.5 0 010-1h15a.5.5 0 010 1z"
      />
      <path
        fill="#D65532"
        d="M19 20c.551 0 1 .449 1 1v4c0 .551-.449 1-1 1h-6c-.551 0-1-.449-1-1v-4c0-.551.449-1 1-1h6m0-1h-6a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2v-4a2 2 0 00-2-2zM5 26h4.75a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25H5a1 1 0 00-1 1v4a1 1 0 001 1zm22-6h-4.75a.25.25 0 00-.25.25v5.5c0 .138.112.25.25.25H27a1 1 0 001-1v-4a1 1 0 00-1-1z"
      />
    </svg>
  ),
  displayName: 'FilesPdfColoredIcon',
});
