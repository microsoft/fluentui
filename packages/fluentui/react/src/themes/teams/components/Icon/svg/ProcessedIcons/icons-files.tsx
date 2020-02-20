import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M22.5 22h-13c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5h2.6c.4 0 .8.2 1.1.4l1.4 1.4c.1.1.2.1.4.1h7.6c.8 0 1.5.7 1.5 1.5v7c-.1.9-.8 1.6-1.6 1.6zm-13-11c-.3 0-.5.2-.5.5v9c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5v-7c0-.3-.2-.5-.5-.5h-7.6c-.4 0-.8-.2-1.1-.4l-1.4-1.4c-.1-.1-.2-.1-.4-.1H9.5z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
