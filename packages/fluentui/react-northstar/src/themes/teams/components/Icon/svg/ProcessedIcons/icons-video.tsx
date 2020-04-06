import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M23.5 20c-.1 0-.3 0-.3-.1l-2.5-2.4c-.5-.4-.7-1-.7-1.5s.2-1.1.6-1.4l2.5-2.4c.1-.1.4-.2.5-.1.2.1.3.3.3.5v7c0 .2-.1.4-.3.5 0-.1 0-.1-.1-.1zm-2.2-3.3l1.7 1.6v-4.7l-1.7 1.6c-.2.3-.3.5-.3.8s.1.5.3.7zM17.5 21H9.8c-.7 0-1.3-.5-1.5-1.3-.2-1.2-.3-2.4-.3-3.7s.1-2.5.4-3.7c.1-.8.7-1.3 1.4-1.3h7.7c.8 0 1.5.7 1.5 1.5v7c0 .8-.7 1.5-1.5 1.5zm-7.7-9c-.2 0-.4.2-.5.5-.2 1.1-.3 2.3-.3 3.5s.1 2.4.3 3.5c.1.3.3.5.5.5h7.7c.3 0 .5-.2.5-.5v-7c0-.3-.2-.5-.5-.5H9.8z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
