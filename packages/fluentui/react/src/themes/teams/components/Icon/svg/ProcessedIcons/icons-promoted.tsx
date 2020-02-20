import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M21 13c0-2.8-2.2-5-5-5s-5 2.2-5 5c0 1.6.8 3.1 2 4v5.2c0 .4.2.7.5.8h.3c.2 0 .4-.1.6-.3l1.6-2 1.6 2c.2.2.5.3.8.2.3-.1.5-.4.5-.8V17c1.3-.9 2.1-2.4 2.1-4zm-9 0c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4zm6 8.6l-1.4-1.7c-.1-.2-.4-.3-.6-.3s-.4.1-.6.3L14 21.6v-4c.6.3 1.3.4 2 .4s1.4-.2 2-.4v4z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
