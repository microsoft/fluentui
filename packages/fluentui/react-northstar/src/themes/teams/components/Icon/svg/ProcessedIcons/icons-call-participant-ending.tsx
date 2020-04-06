import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <path d="M24 18.8c0-.1-.4-.7-.4-.7-.3-.5-.7-1-1.4-1l-.9.1c-.9.2-2.3.8-2.6 2.1l-.2 1.3h-4l-.2-1.2c-.3-1.3-1.7-2-2.6-2.1L11 17c-1-.2-1.4.7-1.8 1.3 0 0-.2.4-.2.5-.1.6.1 1.2.5 1.5 2 1.8 4.4 2.7 7 2.7s5-.9 7-2.7c.4-.4.6-1 .5-1.5zm-7.5-3c.4 0 .8-.4.8-.8v-4.5c0-.4-.4-.8-.8-.8s-.8.4-.8.8V15c0 .4.4.8.8.8z" />
      <circle cx="16.5" cy="17.7" r="1.3" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
