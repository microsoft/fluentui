import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M23.8 11.3c-.1-.3-.3-.5-.6-.6l-5.9-2.4c-.3-.1-.7-.1-.9.1-.2.2-.4.5-.4.8V18c-.7-.6-1.8-1-3-1-2.2 0-4 1.3-4 3s1.8 3 4 3 3.9-1.3 4-2.9v-7.7l2.4 1c.6.2 1.1.3 1.6.3 1.2 0 2.2-.6 2.7-1.7.2-.2.2-.5.1-.7zM13 22c-1.6 0-3-.9-3-2s1.4-2 3-2 3 .9 3 2-1.4 2-3 2zm6.8-9.5L17 11.3V9.2l5.9 2.4c-.6 1.1-1.8 1.4-3.1.9z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
