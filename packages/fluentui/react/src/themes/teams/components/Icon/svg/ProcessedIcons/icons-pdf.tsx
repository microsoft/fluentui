import * as React from 'react'
import { TeamsProcessedSvgIconSpec } from '../types'

export default {
  icon: ({ classes }) => (
    <svg role="presentation" focusable="false" className={classes.svg} viewBox="8 8 16 16">
      <g>
        <path d="M20.5 8H15c-.4 0-.8.2-1.1.5l-3.5 4c-.3.3-.4.7-.4 1.1v9c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5v-13c0-.9-.7-1.6-1.5-1.6zM14 9.9V13h-2.7L14 9.9zm7 12.6c0 .3-.2.5-.5.5h-9c-.3 0-.5-.2-.5-.5V14h4V9h5.5c.3 0 .5.2.5.5v13zm-2.9-3.9c-.4 0-.8.1-1.1.2l-.5-.5-.1-.1-.3-.3c.5-1.1.6-1.8.2-2.2-.2-.3-.6-.3-.8-.2-.6.1-.8.7-.7 1.5.1.4.3.8.5 1.1 0 .1-.1.2-.1.3-.2.5-.3.9-.5 1.2-.3.1-.7.3-1 .4-.4.2-.8.4-1 .9-.1.2-.1.5.1.8.1.2.3.3.6.4h.1c.6 0 1.1-.6 1.2-.8.1-.2.3-.6.6-1.1.5-.2 1-.4 1.6-.5.2.2.4.4.7.5.4.3.9.4 1.3.2.2-.1.4-.2.6-.6.1-.3 0-.5-.1-.6-.4-.5-.8-.7-1.3-.6z" />
      </g>
    </svg>
  ),
  styles: {},
  exportedAs: 'files-pdf',
} as TeamsProcessedSvgIconSpec
