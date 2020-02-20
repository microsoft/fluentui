import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M23 16.7v-3.2c0-.8-.7-1.5-1.5-1.5h-6.6c-.1 0-.3-.1-.4-.1l-1.4-1.4c-.3-.3-.7-.4-1.1-.4H9.5c-.8-.1-1.5.6-1.5 1.4v9c0 .8.7 1.5 1.5 1.5h6.3c.8 1.2 2.2 2 3.7 2 2.5 0 4.5-2 4.5-4.5 0-1.1-.4-2-1-2.8zM9.5 21c-.3 0-.5-.2-.5-.5v-9c0-.3.2-.5.5-.5h2.6c.1 0 .3.1.4.1l1.4 1.4c.3.3.7.4 1.1.4h6.6c.3 0 .5.2.5.5v2.3c-.7-.5-1.6-.8-2.5-.8C17 15 15 17 15 19.5c0 .5.1 1 .3 1.5H9.5zm10 2c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
      <path d="M21.8 19H20v-1.7h-1V19h-1.7v1H19v1.8h1V20h1.8z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
