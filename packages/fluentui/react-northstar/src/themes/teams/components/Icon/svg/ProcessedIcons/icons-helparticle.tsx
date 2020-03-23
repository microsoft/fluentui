import * as React from 'react';
import { TeamsProcessedSvgIconSpec } from '../types';

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M9 8h14v16H9zm13 15V9H10v14zm-4-13v1h-7v-1zm-7 3v-1h10v1zm0 2v-1h10v1zm0 3v-1h4v1zm0 2v-1h4v1zm0 2v-1h4v1zm5 0v-5h5v5zm1-4v3h3v-3z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec;
