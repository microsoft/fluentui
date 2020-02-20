import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M21 11.1c-1.7-1.7-4.2-2.4-6.6-1.9-.3.1-.4.3-.4.6.1.3.3.4.6.4 2-.5 4.1.1 5.6 1.6 2.3 2.3 2.3 6.1 0 8.5s-6.1 2.3-8.5 0c-2.3-2.3-2.3-6.1 0-8.5l.2-.2v2c0 .3.2.5.5.5s.5-.2.5-.5v-3c0-.3-.2-.5-.5-.5h-3c-.2-.1-.4.1-.4.4 0 .3.2.5.5.5h1.6l-.1.1c-2.7 2.7-2.7 7.2 0 9.9 1.4 1.4 3.2 2 5 2s3.6-.7 5-2c2.7-2.8 2.7-7.2 0-9.9z" />
    </svg>
  ),
  styles: {},
  exportedAs: 'retry',
} as TeamsProcessedSvgIconSpec
