import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M18.9 10h-4.1c-.3 0-.6.1-.8.4l-2.6 3c-.2.2-.3.5-.3.8v6.7c0 .6.5 1.1 1.1 1.1H19c.6 0 1.1-.5 1.1-1.1v-9.7c-.1-.7-.6-1.2-1.2-1.2zM14 11.4v2.3h-2l2-2.3zm5.3 9.5c0 .2-.2.4-.4.4h-6.8c-.2 0-.4-.1-.4-.4v-6.4h3v-3.8h4.1c.2 0 .4.2.4.4v9.8z" />
      <path d="M15.8 15.3l-.1-.1c-.1-.1-.2-.1-.3 0-.1 0-.1.1-.1.1l-1.9 1.9c-.2.1-.2.4 0 .5.1.2.4.2.5 0l1.2-1.2v2.8c0 .2.2.4.4.4s.4-.2.4-.4v-2.8l1.2 1.2c.2.2.4.2.5 0 .2 0 .2-.4.1-.5l-1.9-1.9z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
