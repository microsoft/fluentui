import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <path d="M21.5 23.5h-5c-.6 0-1-.5-1-1v-7c0-.6.4-1 1-1h5c.5 0 1 .4 1 1v7c0 .5-.5 1-1 1z" />
      <path d="M21.5 14H21v-2.5c0-.8-.7-1.5-1.5-1.5H17c0-1.1-.9-2-2-2s-2 .9-2 2h-2.5c-.8 0-1.5.7-1.5 1.5v10c0 .8.7 1.5 1.5 1.5h4.6c.2.6.8 1 1.4 1h5c.8 0 1.5-.7 1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5zM12 11h6v1h-6v-1zm3-2c.6 0 1 .4 1 1h-2c0-.6.4-1 1-1zm-5 12.5v-10c0-.3.2-.5.5-.5h.5v1c0 .5.4 1 1 1h6c.5 0 1-.4 1-1v-1h.5c.3 0 .5.2.5.5V14h-3.5c-.8 0-1.5.7-1.5 1.5V22h-4.5c-.3 0-.5-.2-.5-.5zm12 1c0 .3-.2.5-.5.5h-5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h5c.3 0 .5.2.5.5v7z" />
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
