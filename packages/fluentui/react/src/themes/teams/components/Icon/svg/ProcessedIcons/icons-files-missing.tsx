import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M20.5 8H15c-.4 0-.8.2-1.1.5l-3.5 4c-.3.3-.4.7-.4 1.1v9c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5v-13c0-.9-.7-1.6-1.5-1.6zM14 9.9V13h-2.7L14 9.9zm7 12.6c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5V14h4V9h5.5c.3 0 .5.2.5.5v13z" />
      <path d="M16 16c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 .9c.4 0 .8.1 1.2.4l-3 3c-.2-.3-.4-.7-.4-1.2.1-1.3 1-2.2 2.2-2.2zm0 4.2c-.4 0-.8-.1-1.2-.4l3-3c.2.3.4.7.4 1.2-.1 1.3-1 2.2-2.2 2.2z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
