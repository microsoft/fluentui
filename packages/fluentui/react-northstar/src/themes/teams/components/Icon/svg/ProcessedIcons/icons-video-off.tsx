import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M23.7 12c-.2-.1-.4 0-.5.1l-2.5 2.4c-.5.4-.7 1-.7 1.5s.2 1.1.6 1.4l2.5 2.4c.1.1.2.1.3.1h.2c.2-.1.3-.3.3-.5v-7c.1-.1 0-.3-.2-.4zM9 20.8l9.4-9.4c-.3-.2-.6-.3-.9-.3H9.8c-.7 0-1.3.5-1.5 1.3-.2 1.1-.3 2.3-.3 3.6s.1 2.5.4 3.7c0 .5.3.8.6 1.1zM23.9 8.9c.2-.2.2-.5 0-.7s-.5-.2-.7 0l-15 15c-.2.2-.2.5 0 .7 0 .1.2.1.3.1s.3 0 .4-.1l2.9-2.9h5.8c.8 0 1.5-.7 1.5-1.5v-5.8l4.8-4.8z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
