import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="8 8 16 16" className={classes.svg}>
      <g>
        <path d="M22.3 22H9.7c-.9 0-1.7-.8-1.7-1.7v-8.6c0-.9.8-1.7 1.7-1.7h12.6c.9 0 1.7.8 1.7 1.7v8.6c0 .9-.8 1.7-1.7 1.7zM9.7 11c-.4 0-.7.3-.7.7v8.6c0 .4.3.7.7.7h12.6c.4 0 .7-.3.7-.7v-8.6c0-.4-.3-.7-.7-.7H9.7zm5.2 8c-.2 0-.3 0-.4-.1-.3-.2-.5-.5-.5-.9v-4c0-.4.2-.7.5-.8.3-.2.7-.2 1 0l3.1 2c.3.2.4.5.4.8 0 .3-.2.6-.4.8l-3.1 2.1c-.2 0-.4.1-.6.1zm.1-5v3.9l3-2-3-1.9z" />
        <circle cx="10.5" cy="13" r=".5" />
        <circle cx="10.5" cy="15" r=".5" />
        <circle cx="10.5" cy="17" r=".5" />
        <circle cx="10.5" cy="19" r=".5" />
        <circle cx="21.5" cy="13" r=".5" />
        <circle cx="21.5" cy="15" r=".5" />
        <circle cx="21.5" cy="17" r=".5" />
        <circle cx="21.5" cy="19" r=".5" />
      </g>
    </svg>
  ),
  styles: {},
} as TeamsProcessedSvgIconSpec
