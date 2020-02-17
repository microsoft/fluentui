import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M8.5 10.1v11.8l8.8 1.5V8.6l-8.8 1.5zm4.8 8.7h-1.1L10.6 13h1.1l.9 4c.1.2.1.4.1.6 0-.2 0-.4.1-.6l.9-4h1.1l-1.5 5.8zM21 14.8l.3-.4.8-.8-1.1-1.1-1.2 1.1.4.4.4.4zM17.6 14v2.4h1.9c.2 0 .3.2.3.3v1h.8v-2.5L19.4 14h-1.8z" />
      <path d="M23.2 10.8h-5.6v2.5h1.8l1.4-1.4h.2l1.7 1.6c.1.1.1.1 0 .2l-1.4 1.5V18c0 .2-.2.3-.3.3h-1.2v1.2c0 .2-.2.3-.3.3h-1.9v1.4h5.6c.2 0 .3-.1.3-.3v-9.8c0-.2-.1-.3-.3-.3z" />
      <path d="M17.6 17h1.5v2.2h-1.5z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
