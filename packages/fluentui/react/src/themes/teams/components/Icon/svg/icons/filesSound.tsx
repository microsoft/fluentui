import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M20.5 8H15c-.4 0-.8.2-1.1.5l-3.5 4c-.3.3-.4.7-.4 1.1v9c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5v-13c0-.9-.7-1.6-1.5-1.6zM14 9.9V13h-2.7L14 9.9zm7 12.6c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5V14h4V9h5.5c.3 0 .5.2.5.5v13zm-.8-6.9c0-.1-.1-.2-.2-.3l-2.9-1.2c-.1-.1-.3 0-.4 0-.1 0-.1.1-.1.1v4.6c-.4-.3-.9-.5-1.5-.5-1.1 0-2 .7-2 1.5s.9 1.5 2 1.5 2-.7 2-1.5v-3.9l1.3.5c.2.1.5.2.7.2.5 0 1-.3 1.2-.7-.1 0-.1-.2-.1-.3z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
