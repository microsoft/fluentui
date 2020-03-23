import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M20.5 8h-9C9.57 8 8 9.57 8 11.5v9c0 1.93 1.57 3.5 3.5 3.5h9c1.93 0 3.5-1.57 3.5-3.5v-9C24 9.57 22.43 8 20.5 8zm.37 5.74l-5.71 5.71c-.12.11-.24.16-.37.16s-.26-.05-.35-.15l-3.29-3.29c-.2-.2-.2-.51 0-.71.2-.2.51-.2.71 0l2.94 2.93 5.36-5.36c.2-.2.51-.2.71 0 .2.2.2.51 0 .71z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
